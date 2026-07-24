---
title: "Plugin: updater-npm"
description: Aktualisiert das Versionsfeld in einer `package.json`-Datei.
---

Aktualisiert das Versionsfeld in einer `package.json`-Datei. Nutze es, um Node.js-Pakete mit der von semrel ausgewählten Version synchron zu halten.

## Installation

```bash
semrel plugin install @semrel/updater-npm
```

`semrel plugin install` lädt die Binärdatei nach `.semrel/plugins/` herunter und aktualisiert `.semrel.lock`. Committe `.semrel.lock`, um die Version für dein Team festzuschreiben.

## Konfiguration

```yaml
version: 1
plugins:
  - uses: @semrel/updater-npm
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
