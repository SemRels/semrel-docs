---
title: "Plugin: hook-matrix"
description: Posts release notifications to a Matrix room.
---

Posts release notifications to a Matrix room. It works well for teams using Matrix or Element for release coordination and status updates.

## Installation

### Binary

```bash
semrel plugin install @semrel/matrix
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.


### Docker

Pre-built, signed multi-platform images (linux/amd64, linux/arm64) are published on every release:

```bash
docker pull ghcr.io/semrels/hook-matrix:latest
```

Verify the image signature with cosign:

```bash
cosign verify ghcr.io/semrels/hook-matrix:latest \
  --certificate-identity-regexp 'https://github.com/SemRels/hook-matrix/.github/workflows/release.yml.*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```
## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/matrix
    args:
      homeserver: 'https://matrix.example.com'
      # token is read from SEMREL_PLUGIN_TOKEN env var
      room_id: '!release:matrix.example.com'
      message_template: 'Released {{ .TagName }} from {{ .Branch }}'
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_HOMESERVER` | yes | `—` | Matrix homeserver base URL. |
| `SEMREL_PLUGIN_TOKEN` | yes | `—` | Access token used to send messages. |
| `SEMREL_PLUGIN_ROOM_ID` | yes | `—` | Destination room ID, such as `!room:server`. |
| `SEMREL_PLUGIN_MESSAGE_TEMPLATE` | no | `plugin-defined` | Optional Matrix message template. |

## Release Context Variables

- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_BUMP`
- `SEMREL_BRANCH`
- `SEMREL_CHANGELOG`
- `SEMREL_DRY_RUN`

## Example Output

A release can post a message like `Released v1.4.0 from main` followed by the generated changelog into the configured Matrix room.

## Source

- [SemRels/hook-matrix](https://github.com/SemRels/hook-matrix)
