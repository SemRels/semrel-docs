---
title: "Plugin: provider-bitbucket"
description: Publishes release information to Bitbucket from the SemRel release context.
---

Publishes release information to Bitbucket from the SemRel release context. It can create or update Bitbucket release metadata using workspace-level authentication.

## Installation

### Binary

```bash
semrel plugin install @semrel/provider-bitbucket
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.


### Docker

Pre-built, signed multi-platform images (linux/amd64, linux/arm64) are published on every release:

```bash
docker pull ghcr.io/semrels/provider-bitbucket:latest
```

Verify the image signature with cosign:

```bash
cosign verify ghcr.io/semrels/provider-bitbucket:latest \
  --certificate-identity-regexp 'https://github.com/SemRels/provider-bitbucket/.github/workflows/release.yml.*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```
## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/provider-bitbucket
    args:
      workspace: semrels
      repo: semrel
      username: '${{ env.BITBUCKET_USERNAME }}'
      app_password: '${{ env.BITBUCKET_APP_PASSWORD }}'
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_WORKSPACE` | yes | `—` | Bitbucket workspace name. |
| `SEMREL_PLUGIN_REPO` | no | `current repository` | Repository slug to publish into. |
| `SEMREL_PLUGIN_APP_PASSWORD` | yes | `—` | Bitbucket app password. |
| `SEMREL_PLUGIN_USERNAME` | yes | `—` | Bitbucket username. |

## Release Context Variables

- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_CHANGELOG`
- `SEMREL_DRY_RUN`

## Behavior

For `v1.4.0`, the provider can publish a Bitbucket release entry using the generated tag, version text, and changelog body.

## Source

- [SemRels/provider-bitbucket](https://github.com/SemRels/provider-bitbucket)
