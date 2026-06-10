---
title: "Plugin: hook-teams"
description: Sendet Release-Benachrichtigungen an Microsoft Teams über Incoming Webhooks.
---

Sendet Release-Benachrichtigungen an Microsoft Teams über Incoming Webhooks. Nutze ihn, um neue Versionen und Changelog-Highlights mit deinem Team in einem Teams-Channel zu teilen.

## Installation

```bash
go install github.com/SemRels/hook-teams@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
plugins:
  - uses: hook-teams
    args:
      webhook_url: "https://your-tenant.webhook.office.com/webhookb2/..."
      title: "ðŸš€ New Release"      # optional
      theme_color: "0078D7"         # optional, hex without #
      mention: "user@example.com"   # optional, Teams user to @mention
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_WEBHOOK_URL` | ja | `—` | Microsoft-Teams-URL für Incoming Webhooks. |
| `SEMREL_PLUGIN_TITLE` | nein | `ðŸš€ New Release` | Kartentitel, der in der Teams-Nachricht angezeigt wird. |
| `SEMREL_PLUGIN_THEME_COLOR` | nein | `0078D7` | Hex-Farbe (ohne `#`) für die Kartenakzentfarbe. |
| `SEMREL_PLUGIN_MENTION` | nein | `—` | E-Mail-Adresse eines Teams-Benutzers für eine @mention. |

## Einen Webhook-URL erhalten

1. Öffne in Teams den Ziel-Channel → **···** → **Connectors**
2. Suche nach **Incoming Webhook** → **Configure**
3. Gib ihm einen Namen (z. B. `semrel`) und lade optional ein Symbol hoch
4. Kopiere die erzeugte Webhook-URL und speichere sie als Geheimnis

## Release-Kontextvariablen

- `SEMREL_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_CHANGELOG`
- `SEMREL_DRY_RUN`

## Dry-Run-Verhalten

Wenn `SEMREL_DRY_RUN=true`, gibt das Plugin aus, was es senden würde, und beendet sich mit 0, ohne HTTP-Aufrufe auszuführen:

```
hook-teams: [dry-run] would send Teams notification for v1.4.0
```

## Beispielausgabe

Eine erfolgreiche Release sendet eine adaptive Karte in deinen Teams-Channel, die Versionsnummer, Release-Branch und den erzeugten Changelog anzeigt.

## Quelle

- [SemRels/hook-teams](https://github.com/SemRels/hook-teams)
