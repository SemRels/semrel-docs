---
title: "Plugin: updater-cargo"
description: Updates the version field in a Rust Cargo manifest.
---

Updates the version field in a Rust Cargo manifest. Use it to keep `Cargo.toml` aligned with the SemRel version chosen for the release.

## Installation

```bash
semrel plugin install @semrel/cargo
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.

## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/cargo
    args:
      file: Cargo.toml
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_FILE` | no | `Cargo.toml` | Cargo manifest to update. |

## Release Context Variables

- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_DRY_RUN`

## Behavior

For a `1.4.0` release, the updater can change `version = "1.3.2"` to `version = "1.4.0"` in `Cargo.toml`.

## Source

- [SemRels/updater-cargo](https://github.com/SemRels/updater-cargo)
