---
title: "Plugin: updater-terraform"
description: Updates a Terraform variable that stores the application version.
---

Updates a Terraform variable that stores the application version. It is useful when Terraform modules or deployments need the new release version written into configuration.

## Installation

### Binary

```bash
semrel plugin install @semrel/updater-terraform
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.


### Docker

Pre-built, signed multi-platform images (linux/amd64, linux/arm64) are published on every release:

```bash
docker pull ghcr.io/semrels/updater-terraform:latest
```

Verify the image signature with cosign:

```bash
cosign verify ghcr.io/semrels/updater-terraform:latest \
  --certificate-identity-regexp 'https://github.com/SemRels/updater-terraform/.github/workflows/release.yml.*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```
## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/updater-terraform
    args:
      file: variables.tf
      variable: app_version
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_FILE` | no | `variables.tf` | Terraform file to update. |
| `SEMREL_PLUGIN_VARIABLE` | no | `app_version` | Terraform variable name that stores the release version. |

## Release Context Variables

- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_DRY_RUN`

## Behavior

For a `1.4.0` release, the updater can change `default = "1.3.2"` to `default = "1.4.0"` for the configured Terraform variable.

## Source

- [SemRels/updater-terraform](https://github.com/SemRels/updater-terraform)
