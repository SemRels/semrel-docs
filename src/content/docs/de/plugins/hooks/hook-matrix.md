---
title: "Plugin: hook-matrix"
description: Veröffentlicht Release-Benachrichtigungen in einem Matrix-Raum.
---

Veröffentlicht Release-Benachrichtigungen in einem Matrix-Raum. Das funktioniert gut für Teams, die Matrix oder Element für Release-Koordination und Status-Updates nutzen.

## Installation

```bash
semrel plugin install @semrel/hook-matrix
```

`semrel plugin install` lädt die Binärdatei nach `.semrel/plugins/` herunter und aktualisiert `.semrel.lock`. Committe `.semrel.lock`, um die Version für dein Team festzuschreiben.

## Konfiguration

```yaml
version: 1
plugins:
  - uses: @semrel/hook-matrix
    args:
      homeserver: 'https://matrix.example.com'
      # Token wird aus der Umgebungsvariable SEMREL_PLUGIN_TOKEN gelesen
      room_id: '!release:matrix.example.com'
      message_template: 'Released {{ .TagName }} from {{ .Branch }}'
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_HOMESERVER` | ja | `—` | Basis-URL des Matrix-Homeservers. |
| `SEMREL_PLUGIN_TOKEN` | ja | `—` | Zugriffs-Token zum Senden von Nachrichten. |
| `SEMREL_PLUGIN_ROOM_ID` | ja | `—` | Ziel-Raum-ID, z. B. `!room:server`. |
| `SEMREL_PLUGIN_MESSAGE_TEMPLATE` | nein | `vom Plugin definiert` | Optionale Matrix-Nachrichtenvorlage. |

## Release-Kontextvariablen

- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_BUMP`
- `SEMREL_BRANCH`
- `SEMREL_CHANGELOG`
- `SEMREL_DRY_RUN`

## Beispielausgabe

Eine Release kann eine Nachricht wie `Released v1.4.0 from main` gefolgt vom erzeugten Changelog in den konfigurierten Matrix-Raum posten.

## Quelle

- [SemRels/hook-matrix](https://github.com/SemRels/hook-matrix)
