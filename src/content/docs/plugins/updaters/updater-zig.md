---
title: "Plugin: updater-zig"
description: Updates the version field in a Zig build.zig.zon manifest.
---

Updates the version field in a [Zig](https://ziglang.org) `build.zig.zon` manifest. Use it to keep your Zig package version aligned with the SemRel version chosen for the release.

## Installation

### Binary

```bash
semrel plugin install @semrel/updater-zig
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.


### Docker

Pre-built, signed multi-platform images (linux/amd64, linux/arm64) are published on every release:

```bash
docker pull ghcr.io/semrels/updater-zig:latest
```

Verify the image signature with cosign:

```bash
cosign verify ghcr.io/semrels/updater-zig:latest \
  --certificate-identity-regexp 'https://github.com/SemRels/updater-zig/.github/workflows/release.yml.*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```
## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/updater-zig
    args:
      file: build.zig.zon
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_FILE` | no | `build.zig.zon` | build.zig.zon manifest to update. |

## Release Context Variables

- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_DRY_RUN`

## Behavior

`build.zig.zon` is written in ZON (Zig Object Notation): a single anonymous struct literal with no `[section]` headers, so the updater cannot rely on TOML-style scoping. It tracks brace depth while scanning the file and only rewrites the top-level `.version = "..."` field — anything nested inside `.dependencies = .{ ... }` is left untouched. The package identity fields `.name` and `.fingerprint` are never modified.

For a `1.4.0` release, the updater changes:

```zon
.{
    .name = .my_lib,
    .version = "1.3.2",
    .fingerprint = 0xdeadbeefcafef00d,
    .dependencies = .{ ... },
}
```

to:

```zon
.{
    .name = .my_lib,
    .version = "1.4.0",
    .fingerprint = 0xdeadbeefcafef00d,
    .dependencies = .{ ... },
}
```

## Source

- [SemRels/updater-zig](https://github.com/SemRels/updater-zig)
