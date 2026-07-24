---
title: "Plugin: updater-helm"
description: Updates chart metadata in a Helm `Chart.yaml` file.
---

Updates chart metadata in a Helm `Chart.yaml` file. It helps keep Helm chart packages aligned with the application version being released.

## Installation

### Binary

```bash
semrel plugin install @semrel/updater-helm
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.


### Docker

Pre-built, signed multi-platform images (linux/amd64, linux/arm64) are published on every release:

```bash
docker pull ghcr.io/semrels/updater-helm:latest
```

Verify the image signature with cosign:

```bash
cosign verify ghcr.io/semrels/updater-helm:latest \
  --certificate-identity-regexp 'https://github.com/SemRels/updater-helm/.github/workflows/release.yml.*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```
## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/updater-helm
    args:
      file: Chart.yaml
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_FILE` | no | `Chart.yaml` | Helm chart file to update. |

## Release Context Variables

- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_DRY_RUN`

## Behavior

For a `1.4.0` release, the updater can change `version: 1.3.2` and related chart metadata in `Chart.yaml`.

## Source

- [SemRels/updater-helm](https://github.com/SemRels/updater-helm)
