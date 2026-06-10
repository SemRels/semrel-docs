---
title: "Plugin: provider-github"
description: Veröffentlicht Releases in GitHub mit dem erzeugten semrel-Tag, der Version und dem Changelog.
---

Veröffentlicht Releases in GitHub mit dem erzeugten semrel-Tag, der Version und dem Changelog. Es unterstützt Flags für Draft und Prerelease und kann passende Assets aus dem lokalen Workspace hochladen.

## Installation

```bash
go install github.com/SemRels/provider-github@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: provider-github
    path: provider-github
    args:
      token: '${{ env.GITHUB_TOKEN }}'
      owner: SemRels
      repo: semrel
      draft: false
      prerelease: false
      asset_glob: 'dist/*'
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_TOKEN` | ja | `—` | GitHub-Token, das zum Erstellen der Release verwendet wird. |
| `SEMREL_PLUGIN_OWNER` | nein | `aktueller Repository-Eigentümer` | Repository-Eigentümer oder Organisation. |
| `SEMREL_PLUGIN_REPO` | nein | `aktueller Repository-Name` | Repository-Name, in dem veröffentlicht wird. |
| `SEMREL_PLUGIN_DRAFT` | nein | `false` | Die Release als Draft erstellen. |
| `SEMREL_PLUGIN_PRERELEASE` | nein | `false` | Die Release als Prerelease markieren. |
| `SEMREL_PLUGIN_ASSET_GLOB` | nein | `—` | Glob-Muster für hochzuladende Release-Assets. |

## Release-Kontextvariablen

- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_CHANGELOG`
- `SEMREL_DRY_RUN`

## Verhalten

Für `v1.4.0` kann der Provider eine GitHub-Release erstellen, Dateien passend zu `dist/*` anhängen und den semrel-Changelog als Release Notes veröffentlichen.

## Quelle

- [SemRels/provider-github](https://github.com/SemRels/provider-github)
