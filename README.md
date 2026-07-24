# semrel-docs

Documentation & website for semrel built with Astro and Starlight.

## Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to preview.

## Contributing documentation

User-facing documentation is maintained in English and German. Every page under
`src/content/docs/` must be added or updated together with its counterpart under
`src/content/docs/de/`, including Markdown plugin reference pages. Keep required
frontmatter keys and internal links aligned, then run:

```bash
npm run check:docs
```

Locale-only exceptions are limited to intentional legal or local pages and must
be documented with a reason in `scripts/docs-parity.config.mjs`.
First-party plugin examples must use the canonical typed package name
`@semrel/<plugin-type>-<name>`; legacy aliases belong only in explicitly
allowlisted migration or deprecation context.

## Build

```bash
npm run build
```

## Deployment

Deploys to GitHub Pages at `semrel.io` via GitHub Actions.

## Learn More

- [Astro Documentation](https://docs.astro.build)
- [Starlight Documentation](https://starlight.astro.build)
- [semrel Repository](https://github.com/GoSemantics/semrel)
