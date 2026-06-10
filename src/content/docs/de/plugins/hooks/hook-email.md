---
title: "Plugin: hook-email"
description: Sendet nach einem semrel-Lauf Release-Benachrichtigungen per SMTP.
---

Sendet nach einem semrel-Lauf Release-Benachrichtigungen per SMTP. Er kann Versions-, Branch- und Changelog-Details an Release-Manager:innen oder Verteilerlisten von Stakeholdern senden.

## Installation

```bash
go install github.com/SemRels/hook-email@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: hook-email
    path: hook-email
    args:
      smtp_host: smtp.example.com
      smtp_port: 587
      smtp_user: '${{ env.SMTP_USER }}'
      smtp_pass: '${{ env.SMTP_PASS }}'
      from: 'releases@example.com'
      to: 'team@example.com,ops@example.com'
      subject_template: 'Release {{ .TagName }} is live'
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_SMTP_HOST` | ja | `—` | Hostname des SMTP-Servers. |
| `SEMREL_PLUGIN_SMTP_PORT` | nein | `587` | Port des SMTP-Servers. |
| `SEMREL_PLUGIN_SMTP_USER` | ja | `—` | SMTP-Benutzername. |
| `SEMREL_PLUGIN_SMTP_PASS` | ja | `—` | SMTP-Passwort oder App-Passwort. |
| `SEMREL_PLUGIN_FROM` | ja | `—` | E-Mail-Adresse des Absenders. |
| `SEMREL_PLUGIN_TO` | ja | `—` | Kommagetrennte Liste der Empfänger-E-Mail-Adressen. |
| `SEMREL_PLUGIN_SUBJECT_TEMPLATE` | nein | `plugin-defined` | Optionales Betreff-Template für die Release-E-Mail. |
| `SEMREL_PLUGIN_TLS` | nein | `true` | TLS für die SMTP-Verbindung aktivieren oder deaktivieren. |

## Release-Kontextvariablen

- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_BUMP`
- `SEMREL_BRANCH`
- `SEMREL_CHANGELOG`
- `SEMREL_DRY_RUN`

## Beispielausgabe

Ein erfolgreicher Lauf kann eine E-Mail mit einem Betreff wie `Release v1.4.0 is live` senden, deren Text die Bump-Stufe, die Branch und den erzeugten Changelog enthält.

## Quelle

- [SemRels/hook-email](https://github.com/SemRels/hook-email)
