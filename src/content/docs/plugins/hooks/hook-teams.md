---
title: "Plugin: hook-teams"
description: Sends release notifications to Microsoft Teams via Incoming Webhooks.
---

Sends release notifications to Microsoft Teams via Incoming Webhooks. Use it to share new versions and changelog highlights with your team in a Teams channel.

## Installation

```bash
semrel plugin install @semrel/teams
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.

## Configuration

```yaml
plugins:
  - uses: hook-teams
    args:
      webhook_url: "https://your-tenant.webhook.office.com/webhookb2/..."
      title: "ðŸš€ New Release"      # optional
      theme_color: "0078D7"         # optional, hex without #
      mention: "user@example.com"   # optional, Teams user to @mention
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_WEBHOOK_URL` | yes | `—` | Microsoft Teams Incoming Webhook URL. |
| `SEMREL_PLUGIN_TITLE` | no | `ðŸš€ New Release` | Card title shown in the Teams message. |
| `SEMREL_PLUGIN_THEME_COLOR` | no | `0078D7` | Hex colour (without `#`) for the card accent. |
| `SEMREL_PLUGIN_MENTION` | no | `—` | Email address of a Teams user to @mention. |

## Getting a Webhook URL

1. In Teams, open the target channel → **···** → **Connectors**
2. Search for **Incoming Webhook** → **Configure**
3. Give it a name (e.g. `semrel`) and optionally upload an icon
4. Copy the generated webhook URL and store it as a secret

## Release Context Variables

- `SEMREL_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_CHANGELOG`
- `SEMREL_DRY_RUN`

## Dry-Run Behaviour

When `SEMREL_DRY_RUN=true`, the plugin prints what it would send and exits 0 without making any HTTP calls:

```
hook-teams: [dry-run] would send Teams notification for v1.4.0
```

## Example Output

A successful release posts an adaptive card to your Teams channel showing the version number, release branch, and the generated changelog.

## Source

- [SemRels/hook-teams](https://github.com/SemRels/hook-teams)
