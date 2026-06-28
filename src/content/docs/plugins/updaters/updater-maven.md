---
title: "Plugin: updater-maven"
description: Updates the version declared in a Maven `pom.xml` file.
---

Updates the version declared in a Maven `pom.xml` file. It is useful for Java projects that keep their canonical version in Maven metadata.

## Installation

### Binary

```bash
semrel plugin install @semrel/maven
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.


### Docker

Pre-built, signed multi-platform images (linux/amd64, linux/arm64) are published on every release:

```bash
docker pull ghcr.io/semrels/updater-maven:latest
```

Verify the image signature with cosign:

```bash
cosign verify ghcr.io/semrels/updater-maven:latest \
  --certificate-identity-regexp 'https://github.com/SemRels/updater-maven/.github/workflows/release.yml.*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```
## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/maven
    args:
      file: pom.xml
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_FILE` | no | `pom.xml` | Maven POM file to update. |

## Release Context Variables

- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_DRY_RUN`

## Behavior

For a `1.4.0` release, the updater can replace `<version>1.3.2</version>` with `<version>1.4.0</version>` in `pom.xml`.

## Source

- [SemRels/updater-maven](https://github.com/SemRels/updater-maven)
