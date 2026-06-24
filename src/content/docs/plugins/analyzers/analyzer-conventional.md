---
title: "Plugin: analyzer-conventional"
description: Determines the next SemVer bump from Conventional Commit messages.
---

Determines the next SemVer bump from Conventional Commit messages. It maps commit types and breaking-change markers to `major`, `minor`, or `patch` decisions.

## Installation

### Binary

```bash
semrel plugin install @semrel/conventional
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.


### Docker

Pre-built, signed multi-platform images (linux/amd64, linux/arm64) are published on every release:

```bash
docker pull ghcr.io/semrels/analyzer-conventional:latest
```

Verify the image signature with cosign:

```bash
cosign verify ghcr.io/semrels/analyzer-conventional:latest \
  --certificate-identity-regexp 'https://github.com/SemRels/analyzer-conventional/.github/workflows/release.yml.*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```
## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/conventional
    args:
      breaking_change_label: 'BREAKING CHANGE'
      minor_types: feat
      patch_types: 'fix,perf,refactor'
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_BREAKING_CHANGE_LABEL` | no | `BREAKING CHANGE` | Footer label used to detect breaking changes. |
| `SEMREL_PLUGIN_MINOR_TYPES` | no | `feat` | Comma-separated commit types that trigger a minor bump. |
| `SEMREL_PLUGIN_PATCH_TYPES` | no | `fix,perf,refactor` | Comma-separated commit types that trigger a patch bump. |

## Release Context Variables

This plugin does not require any of the shared `SEMREL_*` release context variables to do its job.

## Behavior

Given the commits `feat(api): add search endpoint` and `fix(ui): handle empty state`, the analyzer returns a `minor` bump because `feat` outranks `fix`.

## Source

- [SemRels/analyzer-conventional](https://github.com/SemRels/analyzer-conventional)
