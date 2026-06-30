import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import rehypeMermaid from 'rehype-mermaid';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import compressor from 'astro-compressor';

/**
 * Returns a Starlight badge object if `addedAt` is within the last NEW_BADGE_DAYS days.
 * After that period the badge automatically disappears — no manual cleanup needed.
 *
 * Usage in sidebar:
 *   { label: 'My Page', link: '/my-page/', ...newBadge('2026-06-30') }
 *
 * @param {string} addedAt  ISO date string (YYYY-MM-DD) when the page was added/significantly updated.
 */
const NEW_BADGE_DAYS = 60;
function newBadge(addedAt) {
  const added = new Date(addedAt);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - NEW_BADGE_DAYS);
  if (added >= cutoff) {
    return { badge: { text: 'New', variant: 'tip' } };
  }
  return {};
}

export default defineConfig({
  site: 'https://semrel.io',

  // Instant link prefetching — every visible link is preloaded on hover/intersection
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  // Inline small CSS directly into HTML to eliminate extra round-trips
  build: {
    inlineStylesheets: 'auto',
  },

  // Explicit HTML compression (default in prod, stated here for clarity)
  compressHTML: true,

  // Use class-based CSS scoping for smaller, more predictable selectors
  scopedStyleStrategy: 'class',

  // Consistent trailing-slash URLs (Starlight already enforces this)
  trailingSlash: 'always',

  // Sharp image service with sensible quality defaults for <Image> components
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        defaults: {
          jpeg: { quality: 82 },
          webp: { quality: 85 },
          avif: { quality: 80 },
          png:  { compressionLevel: 9 },
        },
      },
    },
  },
  markdown: {
    // Smart typography: curly quotes, em-dashes, ellipses
    smartypants: true,
    rehypePlugins: [[rehypeMermaid, {
      strategy: 'img-svg',
      mermaidConfig: { theme: 'default' },
      dark: { theme: 'dark' },
    }]],
  },
  integrations: [
    starlight({
      title: 'semrel',
      customCss: ['./src/styles/custom.css'],
      expressiveCode: {
        themes: ['github-dark'],
      },
      components: {
        Head: './src/components/SeoHead.astro',
      },
      description: 'semrel — automated semantic versioning and release management for Go projects. Plugin-based, monorepo-ready, supply-chain secure.',
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
        de: {
          label: 'Deutsch',
          lang: 'de',
        },
      },
      head: [
        // Google Fonts — preconnect + non-blocking link (avoids @import CLS)
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        },
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=optional',
          },
        },
        // Open Graph defaults (overridden per-page via frontmatter)
        {
          tag: 'meta',
          attrs: { property: 'og:type', content: 'website' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:site_name', content: 'semrel' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: 'https://semrel.io/semrel.jpg' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:width', content: '1200' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:height', content: '630' },
        },
        // Twitter / X card
        {
          tag: 'meta',
          attrs: { name: 'twitter:card', content: 'summary_large_image' },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:site', content: '@semrel_io' },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:image', content: 'https://semrel.io/semrel.jpg' },
        },
        // Global keywords
        {
          tag: 'meta',
          attrs: {
            name: 'keywords',
            content:
              'semantic release alternative, zero dependency semantic release, go semver automation, semantic versioning, semver, release automation, go release automation, conventional commits, changelog generator, monorepo release, ci cd release automation, automated github releases, air gapped release automation, goreleaser alternative, standard-version alternative, supply chain secure release, fastest semantic release tool, git tagging automation, gitlab ci semantic release',
          },
        },
        // Web App Manifest
        {
          tag: 'link',
          attrs: { rel: 'manifest', href: '/site.webmanifest' },
        },
        // Canonical is set per-page by Astro; theme colour for mobile browsers
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: '#7c3aed' },
        },
        // JSON-LD: SoftwareApplication schema
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          content: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'semrel',
            url: 'https://semrel.io',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Linux, macOS, Windows',
            license: 'https://www.apache.org/licenses/LICENSE-2.0',
            description:
              'semrel automates semantic versioning and release management for Go projects using Conventional Commits, a fully pluggable pipeline, and a global plugin registry.',
            author: {
              '@type': 'Organization',
              name: 'SemRels',
              url: 'https://github.com/SemRels',
            },
            softwareVersion: 'latest',
            downloadUrl: 'https://github.com/SemRels/semrel/releases',
            featureList: [
              'Automated SemVer bumping from Conventional Commits',
              'Pluggable release pipeline',
              'Monorepo support',
              'Global plugin registry',
              'Supply-chain security (Cosign, SBOM, SLSA)',
              'Dry-run mode',
            ],
            sameAs: [
              'https://github.com/SemRels/semrel',
              'https://registry.semrel.io',
            ],
          }),
        },
        // JSON-LD: Organization
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          content: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'SemRels',
            url: 'https://semrel.io',
            logo: 'https://semrel.io/semrel.png',
            sameAs: [
              'https://github.com/SemRels',
              'https://registry.semrel.io',
            ],
          }),
        },
        // WCAG 2.5.3 fix: mark search button <kbd> shortcuts as aria-hidden
        // so the accessible name of the button matches its visible text label.
        {
          tag: 'script',
          content: `document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('button[data-open-modal] kbd').forEach(function(el){
    el.setAttribute('aria-hidden','true');
  });
});`,
        },
      ],
      logo: {
        src: './public/semrel.svg',
        alt: 'semrel logo',
      },
      favicon: '/semrel.png',
      editLink: {
        baseUrl: 'https://github.com/SemRels/semrel-docs/edit/main/',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/GoSemantics/semrel' },
        { icon: 'external', label: 'Registry', href: 'https://registry.semrel.io' },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [{ autogenerate: { directory: 'getting-started' } }],
        },
        {
          label: 'Guide',
          items: [
            { label: 'vs semantic-release / goreleaser', link: '/guide/comparison/', ...newBadge('2026-01-15') },
            { label: 'Configuration', link: '/guide/configuration/' },
            { label: 'CLI Reference', link: '/guide/cli/' },
            { label: 'Monorepo', link: '/guide/monorepo/' },
            { label: 'Docker', link: '/guide/docker/' },
            { label: 'CI Outputs', link: '/guide/ci-outputs/' },
            { label: 'Schemas', link: '/guide/schemas/' },
            { label: 'Plugin Development', link: '/guide/plugin-development/' },
          ],
        },
        {
          label: 'Plugins',
          items: [
            { label: 'Overview', link: '/plugins/overview/' },
            { label: 'Managing Plugins', link: '/plugins/managing/' },
            { label: 'Official Plugins', link: '/plugins/' },
            {
              label: 'Migrations',
              items: [
                { label: 'Migration Hub', link: '/plugins/migration/', ...newBadge('2026-01-15') },
                { label: 'from semantic-release', link: '/plugins/migrations/semantic-release/' },
                { label: 'from GoReleaser', link: '/plugins/migrations/goreleaser/' },
                { label: 'from release-please', link: '/plugins/migrations/release-please/' },
              ],
            },
            {
              label: 'Conditions',
              items: [
                { label: 'condition-generic', link: '/plugins/conditions/condition-generic/' },
                { label: 'condition-github-actions', link: '/plugins/conditions/condition-github-actions/' },
                { label: 'condition-gitea-actions', link: '/plugins/conditions/condition-gitea-actions/' },
                { label: 'condition-gitlab-ci', link: '/plugins/conditions/condition-gitlab-ci/' },
              ],
            },
            {
              label: 'Hooks',
              items: [
                { label: 'hook-email', link: '/plugins/hooks/hook-email/' },
                { label: 'hook-gitplugin', link: '/plugins/hooks/hook-gitplugin/' },
                { label: 'hook-jira', link: '/plugins/hooks/hook-jira/' },
                { label: 'hook-matrix', link: '/plugins/hooks/hook-matrix/' },
                { label: 'hook-slack', link: '/plugins/hooks/hook-slack/' },
                { label: 'hook-teams', link: '/plugins/hooks/hook-teams/' },
              ],
            },
            {
              label: 'Analyzers',
              items: [
                { label: 'analyzer-conventional', link: '/plugins/analyzers/analyzer-conventional/' },
                { label: 'analyzer-default', link: '/plugins/analyzers/analyzer-default/' },
              ],
            },
            {
              label: 'Generators',
              items: [
                { label: 'generator-changelog-html', link: '/plugins/generators/generator-changelog-html/' },
                { label: 'generator-changelog-md', link: '/plugins/generators/generator-changelog-md/' },
                { label: 'generator-release-notes', link: '/plugins/generators/generator-release-notes/' },
              ],
            },
            {
              label: 'Updaters',
              items: [
                { label: 'updater-cargo', link: '/plugins/updaters/updater-cargo/' },
                { label: 'updater-docker', link: '/plugins/updaters/updater-docker/' },
                { label: 'updater-go', link: '/plugins/updaters/updater-go/' },
                { label: 'updater-gradle', link: '/plugins/updaters/updater-gradle/' },
                { label: 'updater-helm', link: '/plugins/updaters/updater-helm/' },
                { label: 'updater-homebrew', link: '/plugins/updaters/updater-homebrew/' },
                { label: 'updater-maven', link: '/plugins/updaters/updater-maven/' },
                { label: 'updater-npm', link: '/plugins/updaters/updater-npm/' },
                { label: 'updater-nuget', link: '/plugins/updaters/updater-nuget/' },
                { label: 'updater-python', link: '/plugins/updaters/updater-python/' },
                { label: 'updater-terraform', link: '/plugins/updaters/updater-terraform/' },
              ],
            },
            {
              label: 'Packagers',
              items: [
                { label: 'packager-nfpm', link: '/plugins/packagers/packager-nfpm/', ...newBadge('2026-06-01') },
              ],
            },
            {
              label: 'Publishers',
              items: [
                { label: 'publisher-generic-http', link: '/plugins/publishers/publisher-generic-http/', ...newBadge('2026-06-01') },
                { label: 'publisher-oci', link: '/plugins/publishers/publisher-oci/', ...newBadge('2026-06-01') },
              ],
            },
            {
              label: 'Providers',
              items: [
                { label: 'provider-bitbucket', link: '/plugins/providers/provider-bitbucket/' },
                { label: 'provider-git', link: '/plugins/providers/provider-git/' },
                { label: 'provider-gitea', link: '/plugins/providers/provider-gitea/' },
                { label: 'provider-github', link: '/plugins/providers/provider-github/' },
                { label: 'provider-gitlab', link: '/plugins/providers/provider-gitlab/' },
              ],
            },
            { label: 'Registry', link: '/plugins/registry/' },
            { label: 'Registry UI ↗', link: 'https://registry.semrel.io', attrs: { target: '_blank', rel: 'noopener' } },
            { label: 'Publishing', link: '/plugins/publishing/' },
            { label: 'Development', link: '/plugins/sdk/' },
            { label: 'Examples', link: '/plugins/examples/' },
          ],
        },
        {
          label: 'Governance',
          items: [{ autogenerate: { directory: 'governance' } }],
        },
        {
          label: 'Infrastructure',
          items: [{ autogenerate: { directory: 'infrastructure' } }],
        },
        {
          label: 'API',
          items: [{ autogenerate: { directory: 'api' } }],
        },
        {
          label: 'Legal',
          items: [{ autogenerate: { directory: 'legal' } }],
        },
      ],
    }),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          de: 'de-DE',
        },
      },
      filter: (page) =>
        !page.includes('/admin/') && !page.includes('/404'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        // Boost priority for landing + getting-started pages
        if (item.url === 'https://semrel.io/' || item.url === 'https://semrel.io/de/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (
          item.url.includes('/getting-started/') ||
          item.url.includes('/guide/') ||
          item.url.includes('/plugins/')
        ) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        }
        return item;
      },
    }),
    // Minify HTML, CSS, JS, SVG — reduces payload on every page
    compress({
      HTML: {
        'html-minifier-terser': {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          minifyCSS: true,
          minifyJS: true,
        },
      },
      CSS: true,
      JavaScript: true,
      SVG: true,
      Image: false, // We handle images manually (already optimised + WebP)
    }),
    // Generate pre-compressed .gz + .br files — CDN / nginx serves them directly
    compressor({ gzip: true, brotli: true }),
  ],
});
