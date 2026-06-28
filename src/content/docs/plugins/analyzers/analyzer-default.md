---
title: "Plugin: analyzer-default"
description: Determines the next SemVer bump by matching commit messages against regular expressions.
---

Determines the next SemVer bump by matching commit messages against regular expressions. Choose it when you want custom versioning rules without adopting Conventional Commits.

## Installation

### Binary

```bash
semrel plugin install @semrel/default
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.


### Docker

Pre-built, signed multi-platform images (linux/amd64, linux/arm64) are published on every release:

```bash
docker pull ghcr.io/semrels/analyzer-default:latest
```

Verify the image signature with cosign:

```bash
cosign verify ghcr.io/semrels/analyzer-default:latest \
  --certificate-identity-regexp 'https://github.com/SemRels/analyzer-default/.github/workflows/release.yml.*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```
## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/default
    args:
      major_pattern: 'BREAKING|major:'
      minor_pattern: '^feat'
      patch_pattern: '^fix|^perf'
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_MINOR_PATTERN` | no | `plugin-defined regex` | Regular expression that triggers a minor bump. |
| `SEMREL_PLUGIN_PATCH_PATTERN` | no | `plugin-defined regex` | Regular expression that triggers a patch bump. |
| `SEMREL_PLUGIN_MAJOR_PATTERN` | no | `plugin-defined regex` | Regular expression that triggers a major bump. |

## Release Context Variables

This plugin does not require any of the shared `SEMREL_*` release context variables to do its job.

## Behavior

If a commit message matches `major_pattern`, the analyzer returns `major`. Otherwise it falls back to `minor_pattern`, then `patch_pattern`, and returns the highest matching bump.

## Source

- [SemRels/analyzer-default](https://github.com/SemRels/analyzer-default)
