---
title: "Plugin: condition-gitlab-ci"
description: Confirms the current release is running inside GitLab CI.
---

Confirms the current release is running inside GitLab CI. It is a simple safeguard for teams that only trust GitLab-managed pipelines to publish versions.

## Installation

### Binary

```bash
semrel plugin install @semrel/condition-gitlab-ci
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.


### Docker

Pre-built, signed multi-platform images (linux/amd64, linux/arm64) are published on every release:

```bash
docker pull ghcr.io/semrels/condition-gitlab-ci:latest
```

Verify the image signature with cosign:

```bash
cosign verify ghcr.io/semrels/condition-gitlab-ci:latest \
  --certificate-identity-regexp 'https://github.com/SemRels/condition-gitlab-ci/.github/workflows/release.yml.*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```
## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/condition-gitlab-ci
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| _None_ | no | — | This plugin has no dedicated `SEMREL_PLUGIN_*` variables. |

## Release Context Variables

This plugin does not require any of the shared `SEMREL_*` release context variables to do its job.

## Behavior

When `GITLAB_CI=true`, the plugin succeeds. On developer machines or other CI systems, it fails and prevents the release step.

## Source

- [SemRels/condition-gitlab-ci](https://github.com/SemRels/condition-gitlab-ci)
