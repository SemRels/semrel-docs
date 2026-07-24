---
title: "Plugin: updater-docker"
description: Updates a version argument inside a Dockerfile.
---

Updates a version argument inside a Dockerfile. It is useful when your container build embeds the application version through a build argument.

## Installation

```bash
semrel plugin install @semrel/updater-docker
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.

## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/updater-docker
    args:
      file: Dockerfile
      arg_name: VERSION
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_FILE` | no | `Dockerfile` | Dockerfile to update. |
| `SEMREL_PLUGIN_ARG_NAME` | no | `VERSION` | Docker build argument that stores the release version. |

## Release Context Variables

- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_DRY_RUN`

## Behavior

For a `1.4.0` release, the updater can rewrite `ARG VERSION=1.3.2` to `ARG VERSION=1.4.0` in the target Dockerfile.

## Source

- [SemRels/updater-docker](https://github.com/SemRels/updater-docker)
