---
title: "Plugin: hook-email"
description: Sendet nach einem semrel-Lauf Release-Benachrichtigungen per SMTP.
---

Sendet nach einem semrel-Lauf Release-Benachrichtigungen per SMTP. Er kann Versions-, Branch- und Changelog-Details an Release-Manager:innen oder Verteilerlisten von Stakeholdern senden.

## Installation

```bash
semrel plugin install @semrel/hook-email
```

`semrel plugin install` lädt die Binärdatei nach `.semrel/plugins/` herunter und aktualisiert `.semrel.lock`. Committe `.semrel.lock`, um die Version für dein Team festzuschreiben.

## Konfiguration

```yaml
version: 1
plugins:
  - uses: @semrel/hook-email
    args:
      smtp_host: smtp.example.com
      smtp_port: 587
      smtp_user: '${env.SMTP_USER}'
      smtp_pass: '${env.SMTP_PASS}'
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
| `SEMREL_PLUGIN_SUBJECT_TEMPLATE` | nein | `vom Plugin definiert` | Optionale Betreffvorlage für die Release-E-Mail. |
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
