---
title: "Plugin: updater-npm"
description: Aktualisiert das Versionsfeld in einer `package.json`-Datei.
---

Aktualisiert das Versionsfeld in einer `package.json`-Datei. Nutze es, um Node.js-Pakete mit der von semrel ausgewählten Version synchron zu halten.

## Installation

```bash
go install github.com/SemRels/updater-npm@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: updater-npm
    path: updater-npm
    args:
      file: package.json
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_FILE` | nein | `package.json` | Paketmanifest, das aktualisiert werden soll. |

## Release-Kontextvariablen

- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_DRY_RUN`

## Verhalten

Für eine `1.4.0`-Release kann der Updater `"version": "1.3.2"` in `package.json` zu `"version": "1.4.0"` ändern.

## Quelle

- [SemRels/updater-npm](https://github.com/SemRels/updater-npm)
