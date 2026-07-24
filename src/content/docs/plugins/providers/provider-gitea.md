---
title: "Plugin: provider-gitea"
description: Publishes releases to a Gitea instance.
---

Publishes releases to a Gitea instance. It is a good fit for self-hosted teams that manage repositories and releases in Gitea.

## Installation

### Binary

```bash
semrel plugin install @semrel/provider-gitea
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.


### Docker

Pre-built, signed multi-platform images (linux/amd64, linux/arm64) are published on every release:

```bash
docker pull ghcr.io/semrels/provider-gitea:latest
```

Verify the image signature with cosign:

```bash
cosign verify ghcr.io/semrels/provider-gitea:latest \
  --certificate-identity-regexp 'https://github.com/SemRels/provider-gitea/.github/workflows/release.yml.*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```
## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/provider-gitea
    args:
      base_url: 'https://gitea.example.com'
      # token is read from SEMREL_PLUGIN_TOKEN env var
      owner: SemRels
      repo: semrel
      draft: false
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_BASE_URL` | yes | `—` | Base URL for the Gitea instance. |
| `SEMREL_PLUGIN_TOKEN` | yes | `—` | API token for Gitea authentication. |
| `SEMREL_PLUGIN_OWNER` | no | `current repository owner` | Repository owner or organization. |
| `SEMREL_PLUGIN_REPO` | no | `current repository name` | Repository name to publish into. |
| `SEMREL_PLUGIN_DRAFT` | no | `false` | Create the release as a draft. |

## Release Context Variables

- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_CHANGELOG`
- `SEMREL_DRY_RUN`

## Behavior

For `v1.4.0`, the provider can create a Gitea release that uses the SemRel tag name and publishes the generated changelog body.

## Source

- [SemRels/provider-gitea](https://github.com/SemRels/provider-gitea)
