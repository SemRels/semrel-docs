---
title: "Plugin: condition-gitea-actions"
description: Confirms the current release is running inside Gitea Actions.
---

Confirms the current release is running inside Gitea Actions. Use it to block local or foreign CI runs from publishing official releases.

## Installation

### Binary

```bash
semrel plugin install @semrel/condition-gitea-actions
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.


### Docker

Pre-built, signed multi-platform images (linux/amd64, linux/arm64) are published on every release:

```bash
docker pull ghcr.io/semrels/condition-gitea-actions:latest
```

Verify the image signature with cosign:

```bash
cosign verify ghcr.io/semrels/condition-gitea-actions:latest \
  --certificate-identity-regexp 'https://github.com/SemRels/condition-gitea-actions/.github/workflows/release.yml.*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```
## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/condition-gitea-actions
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| _None_ | no | — | This plugin has no dedicated `SEMREL_PLUGIN_*` variables. |

## Release Context Variables

This plugin does not require any of the shared `SEMREL_*` release context variables to do its job.

## Behavior

When `GITEA_ACTIONS=true`, the condition passes. Outside Gitea Actions, the plugin exits non-zero so the release does not continue.

## Source

- [SemRels/condition-gitea-actions](https://github.com/SemRels/condition-gitea-actions)
