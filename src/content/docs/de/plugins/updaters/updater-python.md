---
title: "Plugin: updater-python"
description: Aktualisiert Python-Paketversionsmetadaten in `pyproject.toml` oder einer ähnlichen Backend-Datei.
---

Aktualisiert Python-Paketversionsmetadaten in `pyproject.toml` oder einer ähnlichen Backend-Datei. Wähle ihn, wenn dein Python-Release-Prozess die Anwendungsversion vor dem Paketieren oder Veröffentlichen schreiben muss.

## Installation

```bash
semrel plugin install @semrel/updater-python
```

`semrel plugin install` lädt die Binärdatei nach `.semrel/plugins/` herunter und aktualisiert `.semrel.lock`. Committe `.semrel.lock`, um die Version für dein Team festzuschreiben.

## Konfiguration

```yaml
version: 1
plugins:
  - uses: @semrel/updater-python
    args:
      file: pyproject.toml
      backend: pyproject
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_FILE` | nein | `pyproject.toml` | Python-Projektmetadatendatei, die aktualisiert werden soll. |
| `SEMREL_PLUGIN_BACKEND` | nein | `pyproject` | Metadaten-Backend oder Update-Strategie, die verwendet werden soll. |

## Release-Kontextvariablen

- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_DRY_RUN`

## Verhalten

Für eine `1.4.0`-Release kann der Updater `version = "1.3.2"` in `pyproject.toml` zu `version = "1.4.0"` ändern.

## Quelle

- [SemRels/updater-python](https://github.com/SemRels/updater-python)
