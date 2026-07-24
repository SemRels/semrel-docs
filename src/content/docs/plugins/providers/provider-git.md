---
title: "Plugin: provider-git"
description: Creates git tags and optionally pushes branch updates through the local Git remote.
---

Creates git tags and optionally pushes branch updates through the local Git remote. Use it when your release flow only needs native Git operations instead of a forge-specific API.

## Installation

### Binary

```bash
semrel plugin install @semrel/provider-git
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.


### Docker

Pre-built, signed multi-platform images (linux/amd64, linux/arm64) are published on every release:

```bash
docker pull ghcr.io/semrels/provider-git:latest
```

Verify the image signature with cosign:

```bash
cosign verify ghcr.io/semrels/provider-git:latest \
  --certificate-identity-regexp 'https://github.com/SemRels/provider-git/.github/workflows/release.yml.*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```
## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/provider-git
    args:
      remote: origin
      push_branch: true
      signing_key: ABCDEF1234567890
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_REMOTE` | no | `origin` | Remote name used for push operations. |
| `SEMREL_PLUGIN_SIGNING_KEY` | no | `—` | Optional signing key for annotated or signed tags. |
| `SEMREL_PLUGIN_PUSH_BRANCH` | no | `false` | Push the current branch in addition to the tag. |

## Release Context Variables

- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_BRANCH`
- `SEMREL_TAG_PREFIX`
- `SEMREL_DRY_RUN`

## Behavior

For `v1.4.0`, the provider can create the tag locally and push it to `origin`. If `push_branch` is `true`, it can also push the release commit on the current branch.

## Source

- [SemRels/provider-git](https://github.com/SemRels/provider-git)
