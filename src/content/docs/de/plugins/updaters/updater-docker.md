---
title: "Plugin: updater-docker"
description: Aktualisiert ein Versionsargument in einer Dockerfile.
---

Aktualisiert ein Versionsargument in einer Dockerfile. Das ist nützlich, wenn dein Container-Build die Anwendungsversion über ein Build-Argument einbettet.

## Installation

```bash
semrel plugin install @semrel/updater-docker
```

`semrel plugin install` lädt die Binärdatei nach `.semrel/plugins/` herunter und aktualisiert `.semrel.lock`. Committe `.semrel.lock`, um die Version für dein Team festzuschreiben.

## Konfiguration

```yaml
version: 1
plugins:
  - uses: @semrel/updater-docker
    args:
      file: Dockerfile
      arg_name: VERSION
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_FILE` | nein | `Dockerfile` | Dockerfile, die aktualisiert werden soll. |
| `SEMREL_PLUGIN_ARG_NAME` | nein | `VERSION` | Docker-Build-Argument, das die Release-Version speichert. |

## Release-Kontextvariablen

- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_DRY_RUN`

## Verhalten

Für eine `1.4.0`-Release kann der Updater `ARG VERSION=1.3.2` in der Ziel-Dockerfile zu `ARG VERSION=1.4.0` umschreiben.

## Quelle

- [SemRels/updater-docker](https://github.com/SemRels/updater-docker)
