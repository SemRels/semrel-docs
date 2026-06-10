---
title: "Plugin: generator-changelog-html"
description: Erzeugt einen HTML-Changelog für die anstehende Release.
---

Erzeugt einen HTML-Changelog für die anstehende Release. Das ist nützlich für Release-Portale, statische Websites und E-Mails, die reich formatierte Ausgaben brauchen.

## Installation

```bash
go install github.com/SemRels/generator-changelog-html@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: generator-changelog-html
    path: generator-changelog-html
    args:
      template: templates/changelog.html.tmpl
      css_file: templates/changelog.css
      max_commits: 100
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_TEMPLATE` | nein | `built-in template` | Pfad zu einem Go-Template, das zum Rendern des Changelogs verwendet wird. |
| `SEMREL_PLUGIN_CSS_FILE` | nein | `—` | Optionale CSS-Datei, die in die HTML-Ausgabe eingebettet oder referenziert wird. |
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

Ein erzeugter Changelog kann HTML wie `<h2>v1.4.0</h2><ul><li>feat: add search endpoint</li><li>fix: handle empty state</li></ul>` enthalten.

## Quelle

- [SemRels/generator-changelog-html](https://github.com/SemRels/generator-changelog-html)
