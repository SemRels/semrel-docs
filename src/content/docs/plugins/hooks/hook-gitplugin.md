---
title: "Plugin: hook-gitplugin"
description: Pushes release-related changes to another Git repository or branch.
---

Pushes release-related changes to another Git repository or branch. Use it when SemRel needs to mirror release metadata into a different checkout or automation repository.

## Installation

### Binary

```bash
semrel plugin install @semrel/hook-gitplugin
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.


### Docker

Pre-built, signed multi-platform images (linux/amd64, linux/arm64) are published on every release:

```bash
docker pull ghcr.io/semrels/release-mirror:latest
```

Verify the image signature with cosign:

```bash
cosign verify ghcr.io/semrels/release-mirror:latest \
  --certificate-identity-regexp 'https://github.com/SemRels/release-mirror/.github/workflows/release.yml.*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```
## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/hook-gitplugin
    args:
      repo: 'https://github.com/SemRels/release-mirror.git'
      branch: main
      # token is read from SEMREL_PLUGIN_TOKEN env var
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_REPO` | yes | `—` | Git repository URL or path to update. |
| `SEMREL_PLUGIN_BRANCH` | no | `main` | Target branch to push. |
| `SEMREL_PLUGIN_TOKEN` | no | `—` | Optional token for authenticated pushes. |

## Release Context Variables

- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_BRANCH`
- `SEMREL_CHANGELOG`
- `SEMREL_DRY_RUN`

## Behavior

For a `v1.4.0` release, the hook can clone the configured repository, update release artifacts on `main`, and push the resulting commit after SemRel finishes successfully.

## Source

- [SemRels/hook-gitplugin](https://github.com/SemRels/hook-gitplugin)
