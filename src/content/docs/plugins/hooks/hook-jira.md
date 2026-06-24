---
title: "Plugin: hook-jira"
description: Updates Jira release metadata after SemRel publishes a version.
---

Updates Jira release metadata after SemRel publishes a version. It is useful for creating or updating fix versions and aligning Jira projects with shipped SemVer releases.

## Installation

### Binary

```bash
semrel plugin install @semrel/jira
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.


### Docker

Pre-built, signed multi-platform images (linux/amd64, linux/arm64) are published on every release:

```bash
docker pull ghcr.io/semrels/hook-jira:latest
```

Verify the image signature with cosign:

```bash
cosign verify ghcr.io/semrels/hook-jira:latest \
  --certificate-identity-regexp 'https://github.com/SemRels/hook-jira/.github/workflows/release.yml.*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```
## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/jira
    args:
      base_url: 'https://jira.example.com'
      # token is read from SEMREL_PLUGIN_TOKEN env var
      project: SEMREL
      fix_version_template: '{{ .NextVersion }}'
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_BASE_URL` | yes | `—` | Base URL for the Jira instance. |
| `SEMREL_PLUGIN_TOKEN` | yes | `—` | API token for Jira authentication. |
| `SEMREL_PLUGIN_PROJECT` | yes | `—` | Jira project key. |
| `SEMREL_PLUGIN_FIX_VERSION_TEMPLATE` | no | `plugin-defined` | Template used to name the Jira fix version. |

## Release Context Variables

- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_BUMP`
- `SEMREL_BRANCH`
- `SEMREL_CHANGELOG`
- `SEMREL_DRY_RUN`

## Behavior

With `fix_version_template: '{{ .NextVersion }}'`, a release to `v1.4.0` can create or update the Jira fix version `1.4.0` in the configured project.

## Source

- [SemRels/hook-jira](https://github.com/SemRels/hook-jira)
