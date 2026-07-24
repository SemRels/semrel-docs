---
title: "Plugin: updater-helm"
description: Aktualisiert Chart-Metadaten in einer Helm-`Chart.yaml`-Datei.
---

Aktualisiert Chart-Metadaten in einer Helm-`Chart.yaml`-Datei. Das hilft dir, Helm-Chart-Pakete an der veröffentlichten Anwendungsversion auszurichten.

## Installation

```bash
semrel plugin install @semrel/updater-helm
```

`semrel plugin install` lädt die Binärdatei nach `.semrel/plugins/` herunter und aktualisiert `.semrel.lock`. Committe `.semrel.lock`, um die Version für dein Team festzuschreiben.

## Konfiguration

```yaml
version: 1
plugins:
  - uses: @semrel/updater-helm
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
