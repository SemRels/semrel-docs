---
title: "Plugin: generator-changelog-md"
description: Erzeugt einen Markdown-Changelog für die anstehende Release.
---

Erzeugt einen Markdown-Changelog für die anstehende Release. Nutze es, wenn du Changelog-Ausgaben willst, die committed, veröffentlicht oder von Provider-Plugins wiederverwendet werden können.

## Installation

```bash
go install github.com/SemRels/generator-changelog-md@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: generator-changelog-md
    path: generator-changelog-md
    args:
      template: templates/changelog.md.tmpl
      max_commits: 100
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_TEMPLATE` | nein | `eingebautes Template` | Pfad zu einem Go-Template, das zum Rendern des Changelogs verwendet wird. |
| `SEMREL_PLUGIN_MAX_COMMITS` | nein | `100` | Maximale Anzahl an Commits, die aufgenommen werden. |

## Release-Kontextvariablen

- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_BUMP`
- `SEMREL_BRANCH`
- `SEMREL_TAG_PREFIX`
- `SEMREL_DRY_RUN`

## Beispielausgabe

Ein erzeugter Changelog kann so aussehen:

```md
## v1.4.0
- feat: add search endpoint
- fix: handle empty state
```

## Quelle

- [SemRels/generator-changelog-md](https://github.com/SemRels/generator-changelog-md)
