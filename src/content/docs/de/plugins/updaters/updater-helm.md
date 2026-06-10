---
title: "Plugin: updater-helm"
description: Aktualisiert Chart-Metadaten in einer Helm-`Chart.yaml`-Datei.
---

Aktualisiert Chart-Metadaten in einer Helm-`Chart.yaml`-Datei. Das hilft dir, Helm-Chart-Pakete an der veröffentlichten Anwendungsversion auszurichten.

## Installation

```bash
go install github.com/SemRels/updater-helm@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: updater-helm
    path: updater-helm
    args:
      file: Chart.yaml
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_FILE` | nein | `Chart.yaml` | Helm-Chart-Datei, die aktualisiert werden soll. |

## Release-Kontextvariablen

- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_DRY_RUN`

## Verhalten

Für eine `1.4.0`-Release kann der Updater `version: 1.3.2` und zugehörige Chart-Metadaten in `Chart.yaml` ändern.

## Quelle

- [SemRels/updater-helm](https://github.com/SemRels/updater-helm)
