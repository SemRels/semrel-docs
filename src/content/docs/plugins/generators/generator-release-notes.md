---
title: "Plugin: generator-release-notes"
description: Generates concise release notes and passes them as SEMREL_CHANGELOG to provider and hook plugins.
---

Generates concise, formatted release notes from the release context and commit history.
Running as a `generator` phase plugin, its stdout **overrides** the default `SEMREL_CHANGELOG` value
that provider and hook plugins receive — useful for creating a polished release description
on GitHub Releases, GitLab Releases, or Slack/Teams notifications.

## Installation

### Binary

```bash
semrel plugin install @semrel/generator-release-notes
```

## Configuration


### Docker

Pre-built, signed multi-platform images (linux/amd64, linux/arm64) are published on every release:

```bash
docker pull ghcr.io/semrels/generator-release-notes:latest
```

Verify the image signature with cosign:

```bash
cosign verify ghcr.io/semrels/generator-release-notes:latest \
  --certificate-identity-regexp 'https://github.com/SemRels/generator-release-notes/.github/workflows/release.yml.*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```
```yaml
plugins:
  - uses: @semrel/generator-release-notes
    phase: generator          # stdout captured by semrel → becomes SEMREL_CHANGELOG
    args:
      template: .semrel/templates/release-notes.tmpl   # optional
      max_commits: "50"
      include_body: "false"
  - uses: @semrel/gitlab     # receives the formatted notes as SEMREL_CHANGELOG
  - uses: @semrel/slack      # same
```

## Environment variables

| Name | Required | Default | Description |
|---|---|---|---|
| `SEMREL_PLUGIN_TEMPLATE` | no | built-in | Path to a custom template. |
| `SEMREL_PLUGIN_MAX_COMMITS` | no | `50` | Maximum commits to include. |
| `SEMREL_PLUGIN_INCLUDE_BODY` | no | `false` | Include full commit bodies. |

## Source

- [SemRels/generator-release-notes](https://github.com/SemRels/generator-release-notes)
