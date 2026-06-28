---
title: "Plugin: updater-nuget"
description: Updates the version property inside a `.csproj` or other NuGet project file.
---

Updates the version property inside a `.csproj` or other NuGet project file. It helps keep .NET package metadata in sync with SemRel releases.

## Installation

### Binary

```bash
semrel plugin install @semrel/nuget
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.


### Docker

Pre-built, signed multi-platform images (linux/amd64, linux/arm64) are published on every release:

```bash
docker pull ghcr.io/semrels/updater-nuget:latest
```

Verify the image signature with cosign:

```bash
cosign verify ghcr.io/semrels/updater-nuget:latest \
  --certificate-identity-regexp 'https://github.com/SemRels/updater-nuget/.github/workflows/release.yml.*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```
## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/nuget
    args:
      file: src/App/App.csproj
      property: Version
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_FILE` | no | `*.csproj` | Project file or glob to update. |
| `SEMREL_PLUGIN_PROPERTY` | no | `Version` | XML property that stores the package version. |

## Release Context Variables

- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_DRY_RUN`

## Behavior

For a `1.4.0` release, the updater can change `<Version>1.3.2</Version>` to `<Version>1.4.0</Version>`.

## Source

- [SemRels/updater-nuget](https://github.com/SemRels/updater-nuget)
