---
title: "Plugin: generator-release-notes"
description: Erstellt kompakte Release Notes aus dem aktuellen Release-Kontext und der Commit-Historie.
---

Erstellt kompakte Release Notes aus dem aktuellen Release-Kontext und der Commit-Historie. Das passt gut zu Provider-Plugins, die Release-Beschreibungen in Git-Forges veröffentlichen.

## Installation

```bash
go install github.com/SemRels/generator-release-notes@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: generator-release-notes
    path: generator-release-notes
    args:
      template: templates/release-notes.tmpl
      max_commits: 50
      include_body: false
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_TEMPLATE` | nein | `built-in template` | Pfad zu einem Go-Template, das zum Rendern der Release Notes verwendet wird. |
| `SEMREL_PLUGIN_MAX_COMMITS` | nein | `50` | Maximale Anzahl an Commits, die aufgenommen werden. |
| `SEMREL_PLUGIN_INCLUDE_BODY` | nein | `false` | Den vollständigen Commit-Text in die erzeugten Notizen aufnehmen. |

## Release-Kontextvariablen

- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_BUMP`
- `SEMREL_BRANCH`
- `SEMREL_TAG_PREFIX`
- `SEMREL_DRY_RUN`

## Beispielausgabe

Eine erzeugte Release-Notiz kann `v1.4.0` zusammenfassen, die Bump-Stufe hervorheben und die wichtigsten 50 für die Release ausgewählten Commits auflisten.

## Quelle

- [SemRels/generator-release-notes](https://github.com/SemRels/generator-release-notes)
