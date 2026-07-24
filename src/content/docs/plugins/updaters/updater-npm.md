---
title: "Plugin: updater-npm"
description: Updates the version field in a `package.json` file.
---

Updates the version field in a `package.json` file. Use it to keep Node.js packages aligned with the version selected by SemRel.

## Installation

### Binary

```bash
semrel plugin install @semrel/updater-npm
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.


### Docker

Pre-built, signed multi-platform images (linux/amd64, linux/arm64) are published on every release:

```bash
docker pull ghcr.io/semrels/updater-npm:latest
```

Verify the image signature with cosign:

```bash
cosign verify ghcr.io/semrels/updater-npm:latest \
  --certificate-identity-regexp 'https://github.com/SemRels/updater-npm/.github/workflows/release.yml.*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```
## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/updater-npm
    args:
      file: package.json
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_FILE` | no | `package.json` | Package manifest to update. |

## Release Context Variables

- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_DRY_RUN`

## Behavior

For a `1.4.0` release, the updater can change `"version": "1.3.2"` to `"version": "1.4.0"` in `package.json`.

## Source

- [SemRels/updater-npm](https://github.com/SemRels/updater-npm)
