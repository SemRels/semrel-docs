---
title: "Plugin: provider-bitbucket"
description: Veröffentlicht Release-Informationen aus dem semrel-Release-Kontext in Bitbucket.
---

Veröffentlicht Release-Informationen aus dem semrel-Release-Kontext in Bitbucket. Es kann Bitbucket-Release-Metadaten mit Authentifizierung auf Workspace-Ebene erstellen oder aktualisieren.

## Installation

```bash
go install github.com/SemRels/provider-bitbucket@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: provider-bitbucket
    path: provider-bitbucket
    args:
      workspace: semrels
      repo: semrel
      username: '${{ env.BITBUCKET_USERNAME }}'
      app_password: '${{ env.BITBUCKET_APP_PASSWORD }}'
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_WORKSPACE` | ja | `—` | Name des Bitbucket-Workspace. |
| `SEMREL_PLUGIN_REPO` | nein | `aktuelles Repository` | Repository-Slug, in dem veröffentlicht wird. |
| `SEMREL_PLUGIN_APP_PASSWORD` | ja | `—` | Bitbucket-App-Passwort. |
| `SEMREL_PLUGIN_USERNAME` | ja | `—` | Bitbucket-Benutzername. |

## Release-Kontextvariablen

- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_CHANGELOG`
- `SEMREL_DRY_RUN`

## Verhalten

Für `v1.4.0` kann der Provider einen Bitbucket-Release-Eintrag mit dem erzeugten Tag, dem Versionstext und dem Changelog-Text veröffentlichen.

## Quelle

- [SemRels/provider-bitbucket](https://github.com/SemRels/provider-bitbucket)
