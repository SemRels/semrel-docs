---
title: "Plugin: updater-python"
description: Aktualisiert Python-Paketversionsmetadaten in `pyproject.toml` oder einer ähnlichen Backend-Datei.
---

Aktualisiert Python-Paketversionsmetadaten in `pyproject.toml` oder einer ähnlichen Backend-Datei. Wähle ihn, wenn dein Python-Release-Prozess die Anwendungsversion vor dem Paketieren oder Veröffentlichen schreiben muss.

## Installation

```bash
go install github.com/SemRels/updater-python@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: updater-python
    path: updater-python
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
