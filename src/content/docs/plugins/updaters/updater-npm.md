---
title: "Plugin: updater-npm"
description: Updates the version field in a `package.json` file.
---

Updates the version field in a `package.json` file. Use it to keep Node.js packages aligned with the version selected by SemRel.

## Installation

```bash
semrel plugin install @semrel/npm
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.

## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/npm
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
