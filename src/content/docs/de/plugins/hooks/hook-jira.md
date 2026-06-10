---
title: "Plugin: hook-jira"
description: Aktualisiert Jira-Release-Metadaten, nachdem semrel eine Version veröffentlicht hat.
---

Aktualisiert Jira-Release-Metadaten, nachdem semrel eine Version veröffentlicht hat. Das ist nützlich, um Fix Versions zu erstellen oder zu aktualisieren und Jira-Projekte mit ausgelieferten SemVer-Releases abzugleichen.

## Installation

```bash
go install github.com/SemRels/hook-jira@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: hook-jira
    path: hook-jira
    args:
      base_url: 'https://jira.example.com'
      token: '${{ env.JIRA_TOKEN }}'
      project: SEMREL
      fix_version_template: '{{ .NextVersion }}'
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_BASE_URL` | ja | `—` | Basis-URL der Jira-Instanz. |
| `SEMREL_PLUGIN_TOKEN` | ja | `—` | API-Token für die Jira-Authentifizierung. |
| `SEMREL_PLUGIN_PROJECT` | ja | `—` | Jira-Projektschlüssel. |
| `SEMREL_PLUGIN_FIX_VERSION_TEMPLATE` | nein | `vom Plugin definiert` | Template zum Benennen der Jira-Fix-Version. |

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
