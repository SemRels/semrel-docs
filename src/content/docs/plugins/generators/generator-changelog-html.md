---
title: "Plugin: generator-changelog-html"
description: Generates an HTML changelog and passes it as SEMREL_CHANGELOG to provider and hook plugins.
---

Generates an HTML changelog from the release context and commit history.
Running as a `generator` phase plugin, its stdout **overrides** the default `SEMREL_CHANGELOG` value
that provider and hook plugins receive — useful for platforms that accept HTML release descriptions.

## Installation

### Binary

```bash
semrel plugin install @semrel/generator-changelog-html
```

## Configuration


### Docker

Pre-built, signed multi-platform images (linux/amd64, linux/arm64) are published on every release:

```bash
docker pull ghcr.io/semrels/generator-changelog-html:latest
```

Verify the image signature with cosign:

```bash
cosign verify ghcr.io/semrels/generator-changelog-html:latest \
  --certificate-identity-regexp 'https://github.com/SemRels/generator-changelog-html/.github/workflows/release.yml.*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```
```yaml
plugins:
  - uses: @semrel/generator-changelog-html
    phase: generator          # stdout captured by semrel → becomes SEMREL_CHANGELOG
    args:
      template: .semrel/templates/changelog.html.tmpl   # optional
      css_file: .semrel/templates/changelog.css          # optional
      max_commits: "100"
  - uses: @semrel/github     # receives the HTML as SEMREL_CHANGELOG
```

## Environment variables

| Name | Required | Default | Description |
|---|---|---|---|
| `SEMREL_PLUGIN_TEMPLATE` | no | built-in | Path to a custom Go HTML template. |
| `SEMREL_PLUGIN_CSS_FILE` | no | — | Optional CSS file to embed or reference in the HTML output. |
| `SEMREL_PLUGIN_MAX_COMMITS` | no | `100` | Maximum commits to include. |

## Source

- [SemRels/generator-changelog-html](https://github.com/SemRels/generator-changelog-html)
