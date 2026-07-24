---
title: "Plugin: updater-python"
description: Updates Python package version metadata in `pyproject.toml` or a similar backend file.
---

Updates Python package version metadata in `pyproject.toml` or a similar backend file. Choose it when your Python release process needs the application version written before packaging or publishing.

## Installation

### Binary

```bash
semrel plugin install @semrel/updater-python
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.


### Docker

Pre-built, signed multi-platform images (linux/amd64, linux/arm64) are published on every release:

```bash
docker pull ghcr.io/semrels/updater-python:latest
```

Verify the image signature with cosign:

```bash
cosign verify ghcr.io/semrels/updater-python:latest \
  --certificate-identity-regexp 'https://github.com/SemRels/updater-python/.github/workflows/release.yml.*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```
## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/updater-python
    args:
      file: pyproject.toml
      backend: pyproject
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_FILE` | no | `pyproject.toml` | Python project metadata file to update. |
| `SEMREL_PLUGIN_BACKEND` | no | `pyproject` | Metadata backend or update strategy to use. |

## Release Context Variables

- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_DRY_RUN`

## Behavior

For a `1.4.0` release, the updater can change `version = "1.3.2"` to `version = "1.4.0"` in `pyproject.toml`.

## Source

- [SemRels/updater-python](https://github.com/SemRels/updater-python)
