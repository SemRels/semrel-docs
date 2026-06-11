---
title: "Plugin: condition-generic"
description: Runs a shell command and only passes when that command exits with status 0.
---

Runs a shell command and only passes when that command exits with status 0. Use it to gate releases on custom branch checks, repository state, or external validation logic.

## Installation

```bash
semrel plugin install @semrel/generic
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.

## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/generic
    args:
      command: 'test "$SEMREL_BRANCH" = "main"'
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_COMMAND` | yes | `—` | Shell command that must exit with status 0 for the condition to pass. |

## Release Context Variables

The plugin itself only reads `SEMREL_PLUGIN_COMMAND`, but the command it executes inherits the full SemRel release context:

- `SEMREL_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_BUMP`
- `SEMREL_BRANCH`
- `SEMREL_TAG_PREFIX`
- `SEMREL_CHANGELOG`
- `SEMREL_DRY_RUN`

## Behavior

With `command: 'test "$SEMREL_BRANCH" = "main"'`, the plugin exits `0` on `main` and exits non-zero on every other branch.

## Source

- [SemRels/condition-generic](https://github.com/SemRels/condition-generic)
