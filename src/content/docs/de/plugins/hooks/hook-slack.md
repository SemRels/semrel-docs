---
title: "Plugin: hook-slack"
description: Veröffentlicht Release-Benachrichtigungen in Slack über einen eingehenden Webhook.
---

Veröffentlicht Release-Benachrichtigungen in Slack über einen eingehenden Webhook. Nutze ihn, um neue Versionen, Changelog-Highlights und Dry-Run-Ergebnisse mit deinem Team zu teilen.

## Installation

```bash
go install github.com/SemRels/hook-slack@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: hook-slack
    path: hook-slack
    args:
      webhook_url: '${{ env.SLACK_WEBHOOK_URL }}'
      channel: '#releases'
      username: semrel
      icon_emoji: ':rocket:'
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_WEBHOOK_URL` | ja | `—` | Slack-URL für eingehende Webhooks. |
| `SEMREL_PLUGIN_CHANNEL` | nein | `Workspace-Standard` | Überschreibt den Ziel-Channel für den Webhook. |
| `SEMREL_PLUGIN_USERNAME` | nein | `semrel` | Anzeigename für die Slack-Nachricht. |
| `SEMREL_PLUGIN_ICON_EMOJI` | nein | `:rocket:` | Emoji-Symbol für die Slack-Nachricht. |

## Release-Kontextvariablen

- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_BUMP`
- `SEMREL_BRANCH`
- `SEMREL_CHANGELOG`
- `SEMREL_DRY_RUN`

## Beispielausgabe

Eine erfolgreiche Release kann `v1.4.0 released from main` mit dem erzeugten Changelog über den konfigurierten Webhook nach `#releases` posten.

## Quelle

- [SemRels/hook-slack](https://github.com/SemRels/hook-slack)
