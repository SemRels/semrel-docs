---
title: "Plugin: updater-go"
description: Updates a Go source file that exposes the project version.
---

Updates a Go source file that exposes the project version. It is typically used to keep a `version.go` constant in sync with the SemRel release version.

## Installation

### Binary

```bash
semrel plugin install @semrel/go
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.

### Docker

Pre-built, signed multi-platform images (linux/amd64, linux/arm64) are published on every release:

```bash
docker pull ghcr.io/semrels/updater-go:latest
```

Verify the image signature with cosign:

```bash
cosign verify ghcr.io/semrels/updater-go:latest \
  --certificate-identity-regexp 'https://github.com/SemRels/updater-go/.github/workflows/release.yml.*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```

## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/go
    args:
      file: version.go
      variable: Version
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_FILE` | no | `version.go` | Go source file to update. |
| `SEMREL_PLUGIN_VARIABLE` | no | `Version` | Variable or constant name that holds the version string. |

## Release Context Variables

- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_DRY_RUN`

## Behavior

For a `1.4.0` release, the updater can change `const Version = "1.3.2"` to `const Version = "1.4.0"`.

## Source

- [SemRels/updater-go](https://github.com/SemRels/updater-go)
