import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import rehypeMermaid from 'rehype-mermaid';

export default defineConfig({
  site: 'https://semrel.io',
  markdown: {
    rehypePlugins: [[rehypeMermaid, {
      strategy: 'img-svg',
      mermaidConfig: { theme: 'default' },
      dark: { theme: 'dark' },
    }]],
  },
  integrations: [
    starlight({
      title: 'semrel',
      description: 'Semantic Versioning for Go',
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
            { autogenerate: { directory: 'guide' } },
          ],
        },
        {
          label: 'Plugins',
          items: [
            { label: 'Overview', link: '/plugins/overview/' },
            { label: 'Managing Plugins', link: '/plugins/managing/', badge: { text: 'New', variant: 'tip' } },
            { label: 'Official Plugins', link: '/plugins/' },
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
      ],
    }),
    mdx(),
  ],
});
