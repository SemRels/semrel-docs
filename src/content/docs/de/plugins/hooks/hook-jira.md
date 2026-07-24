---
title: "Plugin: hook-jira"
description: Aktualisiert Jira-Release-Metadaten, nachdem semrel eine Version veröffentlicht hat.
---

Aktualisiert Jira-Release-Metadaten, nachdem semrel eine Version veröffentlicht hat. Das ist nützlich, um Fix Versions zu erstellen oder zu aktualisieren und Jira-Projekte mit ausgelieferten SemVer-Releases abzugleichen.

## Installation

```bash
semrel plugin install @semrel/hook-jira
```

`semrel plugin install` lädt die Binärdatei nach `.semrel/plugins/` herunter und aktualisiert `.semrel.lock`. Committe `.semrel.lock`, um die Version für dein Team festzuschreiben.

## Konfiguration

```yaml
version: 1
plugins:
  - uses: @semrel/hook-jira
    args:
      base_url: 'https://jira.example.com'
      # Token wird aus der Umgebungsvariable SEMREL_PLUGIN_TOKEN gelesen
      project: SEMREL
      fix_version_template: '{{ .NextVersion }}'
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_BASE_URL` | ja | `—` | Basis-URL der Jira-Instanz. |
| `SEMREL_PLUGIN_TOKEN` | ja | `—` | API-Token für die Jira-Authentifizierung. |
| `SEMREL_PLUGIN_PROJECT` | ja | `—` | Jira-Projektschlüssel. |
| `SEMREL_PLUGIN_FIX_VERSION_TEMPLATE` | nein | `vom Plugin definiert` | Vorlage zum Benennen der Jira-Fix-Version. |

## Release-Kontextvariablen

- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_BUMP`
- `SEMREL_BRANCH`
- `SEMREL_CHANGELOG`
- `SEMREL_DRY_RUN`

## Verhalten

Mit `fix_version_template: '{{ .NextVersion }}'` kann eine Release auf `v1.4.0` die Jira-Fix-Version `1.4.0` im konfigurierten Projekt erstellen oder aktualisieren.

## Quelle

- [SemRels/hook-jira](https://github.com/SemRels/hook-jira)
