import assert from 'node:assert/strict';
import test from 'node:test';
import {
  checkPluginNames,
  findInternalLinks,
  frontmatterShape,
  makePageRecord,
  validateExceptionConfig,
  validateParity,
} from './check-docs-parity.mjs';

const page = (file, title = 'Title') => makePageRecord(file, `---
title: ${title}
description: Description
---

Content
`);

test('pairs Markdown and MDX pages by route and compares frontmatter shape', () => {
  const records = [page('plugins/example.md'), page('de/plugins/example.mdx', 'Beispiel')];
  assert.deepEqual(validateParity(records), []);

  records[1].frontmatter.sidebar = { order: 1 };
  assert.match(validateParity(records).join('\n'), /frontmatter keys or value shapes differ/);
});

test('reports missing counterparts and restricts exceptions to legal or local pages', () => {
  assert.match(validateParity([page('guide/only-english.mdx')]).join('\n'), /no German counterpart/);
  assert.deepEqual(validateExceptionConfig([
    { locale: 'en', page: 'legal/terms', reason: 'Jurisdiction-specific' },
  ]), []);
  assert.match(validateExceptionConfig([
    { locale: 'en', page: 'guide/terms', reason: '' },
  ]).join('\n'), /not under legal\/ or local|non-empty reason/);
});

test('finds Markdown and MDX links but ignores fenced examples and images', () => {
  const links = findInternalLinks(`
[Guide](/guide/)
<LinkButton href="/plugins/">Plugins</LinkButton>
![Logo](/logo.svg)
\`\`\`md
[Example](/not-a-real-page/)
\`\`\`
`);
  assert.deepEqual(links.map(({ target }) => target), ['/guide/', '/plugins/']);
});

test('frontmatter shape is key-order independent and preserves nested types', () => {
  assert.deepEqual(
    frontmatterShape({ nested: { count: 1, enabled: true }, title: 'English' }),
    frontmatterShape({ title: 'Deutsch', nested: { enabled: false, count: 2 } }),
  );
});

test('requires typed canonical names on first-party plugin pages', () => {
  const legacy = page('plugins/hooks/hook-teams.md');
  legacy.source += '\nsemrel plugin install @semrel/teams\n';
  assert.match(checkPluginNames([legacy]).join('\n'), /must be "@semrel\/hook-teams"/);

  const canonical = page('plugins/hooks/hook-teams.md');
  canonical.source += '\nsemrel plugin install @semrel/hook-teams\n';
  assert.deepEqual(checkPluginNames([canonical]), []);

  const bare = page('plugins/overview.mdx');
  bare.source += '\nsemrel plugin install github\n';
  assert.match(checkPluginNames([bare]).join('\n'), /bare plugin name "github"/);

  bare.source = bare.source.replace('semrel plugin install github', 'uses: github');
  assert.match(checkPluginNames([bare]).join('\n'), /bare uses name "github"/);

  bare.source = bare.source.replace('uses: github', 'uses: provider-github');
  assert.match(checkPluginNames([bare]).join('\n'), /bare uses name "provider-github"/);
});
