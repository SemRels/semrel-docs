import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseFrontmatter } from '@astrojs/markdown-remark';
import {
  counterpartExceptions,
  legacyPluginNameExceptions,
} from './docs-parity.config.mjs';

const DOC_EXTENSIONS = new Set(['.md', '.mdx']);
const REQUIRED_FRONTMATTER = ['title', 'description'];
const PLUGIN_TYPE_PREFIX = /^(?:analyzer|condition|generator|hook|packager|provider|publisher|updater)-/;
const LEGACY_PLUGIN_NAMES = new Map([
  ['@semrel/bitbucket', '@semrel/provider-bitbucket'],
  ['@semrel/cargo', '@semrel/updater-cargo'],
  ['@semrel/changelog-md', '@semrel/generator-changelog-md'],
  ['@semrel/conventional', '@semrel/analyzer-conventional'],
  ['@semrel/default', '@semrel/analyzer-default'],
  ['@semrel/docker', '@semrel/updater-docker'],
  ['@semrel/email', '@semrel/hook-email'],
  ['@semrel/generic', '@semrel/condition-generic'],
  ['@semrel/generic-http', '@semrel/publisher-generic-http'],
  ['@semrel/git', '@semrel/provider-git'],
  ['@semrel/gitea', '@semrel/provider-gitea'],
  ['@semrel/gitea-actions', '@semrel/condition-gitea-actions'],
  ['@semrel/github', '@semrel/provider-github'],
  ['@semrel/github-actions', '@semrel/condition-github-actions'],
  ['@semrel/gitlab', '@semrel/provider-gitlab'],
  ['@semrel/gitlab-ci', '@semrel/condition-gitlab-ci'],
  ['@semrel/gitplugin', '@semrel/hook-gitplugin'],
  ['@semrel/go', '@semrel/updater-go'],
  ['@semrel/gradle', '@semrel/updater-gradle'],
  ['@semrel/helm', '@semrel/updater-helm'],
  ['@semrel/homebrew', '@semrel/updater-homebrew'],
  ['@semrel/jira', '@semrel/hook-jira'],
  ['@semrel/matrix', '@semrel/hook-matrix'],
  ['@semrel/maven', '@semrel/updater-maven'],
  ['@semrel/nfpm', '@semrel/packager-nfpm'],
  ['@semrel/npm', '@semrel/updater-npm'],
  ['@semrel/nuget', '@semrel/updater-nuget'],
  ['@semrel/oci', '@semrel/publisher-oci'],
  ['@semrel/python', '@semrel/updater-python'],
  ['@semrel/release-notes', '@semrel/generator-release-notes'],
  ['@semrel/slack', '@semrel/hook-slack'],
  ['@semrel/teams', '@semrel/hook-teams'],
  ['@semrel/terraform', '@semrel/updater-terraform'],
]);

function canonicalForUnscoped(name) {
  if (PLUGIN_TYPE_PREFIX.test(name)) return `@semrel/${name}`;
  return LEGACY_PLUGIN_NAMES.get(`@semrel/${name}`);
}

function toPosix(value) {
  return value.split(path.sep).join('/');
}

function withoutExtension(value) {
  return value.replace(/\.mdx?$/i, '');
}

function routeFromPage(locale, page) {
  const suffix = page === 'index'
    ? ''
    : page.endsWith('/index')
      ? page.slice(0, -'/index'.length)
      : page;
  const localized = locale === 'de' ? `/de/${suffix}` : `/${suffix}`;
  return normalizeRoute(localized);
}

export function normalizeRoute(value) {
  let route = value.replace(/[?#].*$/, '').replace(/\/+/g, '/');
  if (route !== '/' && route.endsWith('/')) route = route.slice(0, -1);
  return route || '/';
}

export function frontmatterShape(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return value.map(frontmatterShape);
  if (typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value).sort().map((key) => [key, frontmatterShape(value[key])]),
    );
  }
  return typeof value;
}

function sameShape(left, right) {
  return JSON.stringify(frontmatterShape(left)) === JSON.stringify(frontmatterShape(right));
}

function collectFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) return collectFiles(absolute);
      return DOC_EXTENSIONS.has(path.extname(entry.name).toLowerCase()) ? [absolute] : [];
    });
}

export function makePageRecord(relativePath, source) {
  const normalized = toPosix(relativePath);
  const locale = normalized.startsWith('de/') ? 'de' : 'en';
  const localePath = locale === 'de' ? normalized.slice(3) : normalized;
  const page = withoutExtension(localePath);
  const parsed = parseFrontmatter(source);
  return {
    locale,
    page,
    relativePath: normalized,
    route: routeFromPage(locale, page),
    frontmatter: parsed.frontmatter,
    content: parsed.content,
    source,
  };
}

export function validateExceptionConfig(exceptions) {
  const issues = [];
  const seen = new Set();
  for (const exception of exceptions) {
    const key = `${exception.locale}:${exception.page}`;
    if (!['en', 'de'].includes(exception.locale)) {
      issues.push(`Exception ${key} has an invalid locale.`);
    }
    if (!/^(legal|local)\//.test(exception.page ?? '')) {
      issues.push(`Exception ${key} is not under legal/ or local/.`);
    }
    if (typeof exception.reason !== 'string' || exception.reason.trim() === '') {
      issues.push(`Exception ${key} needs a non-empty reason.`);
    }
    if (seen.has(key)) issues.push(`Exception ${key} is duplicated.`);
    seen.add(key);
  }
  return issues;
}

export function validateParity(records, exceptions = []) {
  const issues = validateExceptionConfig(exceptions);
  const exceptionKeys = new Set(exceptions.map(({ locale, page }) => `${locale}:${page}`));
  const pages = new Map();

  for (const record of records) {
    const key = `${record.locale}:${record.page}`;
    if (pages.has(key)) {
      issues.push(`${record.relativePath}: duplicate documentation route ${record.route}.`);
    }
    pages.set(key, record);

    for (const required of REQUIRED_FRONTMATTER) {
      if (typeof record.frontmatter[required] !== 'string' || record.frontmatter[required].trim() === '') {
        issues.push(`${record.relativePath}: frontmatter "${required}" must be a non-empty string.`);
      }
    }
  }

  const pageNames = new Set(records.map(({ page }) => page));
  for (const page of [...pageNames].sort()) {
    const english = pages.get(`en:${page}`);
    const german = pages.get(`de:${page}`);
    if (!english && !exceptionKeys.has(`de:${page}`)) {
      issues.push(`de/${page}: German page has no English counterpart.`);
    }
    if (!german && !exceptionKeys.has(`en:${page}`)) {
      issues.push(`${page}: English page has no German counterpart.`);
    }
    if (english && german && !sameShape(english.frontmatter, german.frontmatter)) {
      issues.push(
        `${english.relativePath} / ${german.relativePath}: frontmatter keys or value shapes differ.`,
      );
    }
  }

  for (const exception of exceptions) {
    const source = pages.get(`${exception.locale}:${exception.page}`);
    const counterpartLocale = exception.locale === 'en' ? 'de' : 'en';
    if (!source) {
      issues.push(`Exception ${exception.locale}:${exception.page} does not name an existing page.`);
    } else if (pages.has(`${counterpartLocale}:${exception.page}`)) {
      issues.push(`Exception ${exception.locale}:${exception.page} is stale; its counterpart exists.`);
    }
  }

  return issues;
}

function maskCodeFences(source) {
  return source.replace(/^( {0,3})(```|~~~)[^\n]*\n[\s\S]*?^\1\2[^\n]*$/gm, (block) =>
    block.replace(/[^\n]/g, ' '));
}

export function findInternalLinks(source) {
  const content = maskCodeFences(source);
  const links = [];
  const patterns = [
    /(?<!!)\[[^\]]*]\(\s*<?([^)\s>]+)>?(?:\s+["'][^"']*["'])?\s*\)/g,
    /\b(?:href|to)=["']([^"']+)["']/g,
  ];
  for (const pattern of patterns) {
    for (const match of content.matchAll(pattern)) {
      const target = match[1];
      if (/^(?:[/#.]{1,2}|[a-zA-Z0-9_-])/.test(target) && !/^[a-z][a-z0-9+.-]*:/i.test(target)) {
        links.push({
          target,
          line: content.slice(0, match.index).split('\n').length,
        });
      }
    }
  }
  return links;
}

function collectFrontmatterLinks(value, links = []) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectFrontmatterLinks(item, links));
  } else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      if (['href', 'link'].includes(key) && typeof item === 'string') {
        links.push({ target: item, line: 1 });
      } else {
        collectFrontmatterLinks(item, links);
      }
    }
  }
  return links;
}

function resolveTarget(target, sourceRoute) {
  if (
    target === ''
    || target.startsWith('#')
    || target.startsWith('//')
    || target.startsWith('{')
    || /^[a-z][a-z0-9+.-]*:/i.test(target)
  ) {
    return null;
  }
  try {
    return normalizeRoute(new URL(target, `https://docs.invalid${sourceRoute}/`).pathname);
  } catch {
    return `INVALID:${target}`;
  }
}

function checkLinks(records, publicRoot) {
  const issues = [];
  const routes = new Set(records.map(({ route }) => route));

  for (const record of records) {
    const links = [
      ...findInternalLinks(record.content),
      ...collectFrontmatterLinks(record.frontmatter),
    ];
    for (const { target, line } of links) {
      const route = resolveTarget(target, record.route);
      if (!route) continue;
      const publicPath = path.join(publicRoot, ...route.slice(1).split('/'));
      const targetExists = routes.has(route) || fs.existsSync(publicPath);
      if (!targetExists) {
        issues.push(`${record.relativePath}:${line}: internal link "${target}" has no target.`);
        continue;
      }

      if (
        record.locale === 'de'
        && target.startsWith('/')
        && !route.startsWith('/de')
        && routes.has(route)
        && routes.has(normalizeRoute(`/de${route}`))
      ) {
        issues.push(`${record.relativePath}:${line}: German page links to English route "${target}".`);
      }
      if (record.locale === 'en' && route.startsWith('/de') && routes.has(route)) {
        issues.push(`${record.relativePath}:${line}: English page links to German route "${target}".`);
      }
    }
  }
  return issues;
}

function sidebarLinks(configSource) {
  const withoutBlockComments = configSource.replace(/\/\*[\s\S]*?\*\//g, '');
  return [...withoutBlockComments.matchAll(/\blink:\s*['"]([^'"]+)['"]/g)]
    .map((match) => match[1])
    .filter((link) => link.startsWith('/'));
}

function checkSidebar(records, astroConfigPath) {
  const issues = [];
  const routes = new Set(records.map(({ route }) => route));
  const config = fs.readFileSync(astroConfigPath, 'utf8');
  for (const target of new Set(sidebarLinks(config))) {
    const route = normalizeRoute(target);
    if (!routes.has(route)) {
      issues.push(`astro.config.mjs: sidebar target "${target}" has no English page.`);
    }
    const germanRoute = route === '/' ? '/de' : normalizeRoute(`/de${route}`);
    if (!routes.has(germanRoute)) {
      issues.push(`astro.config.mjs: sidebar target "${target}" has no German page.`);
    }
  }
  return issues;
}

export function checkPluginNames(records, exceptions = []) {
  const issues = [];
  const exceptionKeys = new Set();
  for (const exception of exceptions) {
    const key = `${exception.page}:${exception.kind}:${exception.name}`;
    const validName = exception.kind === 'reference'
      ? LEGACY_PLUGIN_NAMES.has(exception.name)
      : Boolean(canonicalForUnscoped(exception.name));
    if (
      typeof exception.page !== 'string'
      || !['reference', 'install', 'uses'].includes(exception.kind)
      || !validName
      || typeof exception.reason !== 'string'
      || exception.reason.trim() === ''
    ) {
      issues.push(`Legacy plugin-name exception ${key} needs a valid page, legacy name, and reason.`);
    }
    exceptionKeys.add(key);
  }

  for (const record of records) {
    const names = [...record.source.matchAll(/@semrel\/[a-z0-9-]+/g)].map((match) => match[0]);
    for (const name of new Set(names)) {
      const canonical = LEGACY_PLUGIN_NAMES.get(name);
      if (canonical && !exceptionKeys.has(`${record.page}:reference:${name}`)) {
        issues.push(`${record.relativePath}: legacy plugin name "${name}" must be "${canonical}".`);
      }
    }

    const bareInstalls = [...record.source.matchAll(/semrel plugin install\s+([a-z][a-z0-9-]*)/g)]
      .map((match) => match[1]);
    for (const name of new Set(bareInstalls)) {
      const canonical = canonicalForUnscoped(name);
      if (canonical && !exceptionKeys.has(`${record.page}:install:${name}`)) {
        issues.push(`${record.relativePath}: bare plugin name "${name}" must be "${canonical}".`);
      }
    }

    const bareUses = [...record.source.matchAll(
      /\buses:\s+([a-z][a-z0-9-]*)(?:@[a-zA-Z0-9_.-]+)?(?=\s|$|[`'",])/g,
    )].map((match) => match[1]);
    for (const name of new Set(bareUses)) {
      const canonical = canonicalForUnscoped(name);
      if (canonical && !exceptionKeys.has(`${record.page}:uses:${name}`)) {
        issues.push(`${record.relativePath}: bare uses name "${name}" must be "${canonical}".`);
      }
    }

    const detail = record.page.match(
      /^plugins\/(?:analyzers|conditions|generators|hooks|packagers|providers|publishers|updaters)\/([^/]+)$/,
    );
    if (detail) {
      const canonical = `@semrel/${detail[1]}`;
      if (!names.includes(canonical)) {
        issues.push(`${record.relativePath}: plugin page must show canonical name "${canonical}".`);
      }
    }
  }
  return issues;
}

export function checkRepository(rootDirectory = process.cwd()) {
  const docsRoot = path.join(rootDirectory, 'src', 'content', 'docs');
  const files = collectFiles(docsRoot);
  const records = [];
  const issues = [];

  for (const file of files) {
    const relativePath = path.relative(docsRoot, file);
    try {
      records.push(makePageRecord(relativePath, fs.readFileSync(file, 'utf8')));
    } catch (error) {
      issues.push(`${toPosix(relativePath)}: invalid frontmatter (${error.message}).`);
    }
  }

  issues.push(...validateParity(records, counterpartExceptions));
  issues.push(...checkPluginNames(records, legacyPluginNameExceptions));
  issues.push(...checkLinks(records, path.join(rootDirectory, 'public')));
  issues.push(...checkSidebar(records, path.join(rootDirectory, 'astro.config.mjs')));
  return { files: records.length, issues };
}

function main() {
  const { files, issues } = checkRepository();
  if (issues.length > 0) {
    console.error(`Documentation parity check failed with ${issues.length} issue(s):`);
    issues.forEach((issue) => console.error(`- ${issue}`));
    process.exitCode = 1;
    return;
  }
  console.log(`Documentation parity check passed (${files} English/German Markdown and MDX pages).`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main();
}
