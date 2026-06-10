---
title: "Plugin: updater-docker"
description: Aktualisiert ein Versionsargument in einer Dockerfile.
---

Aktualisiert ein Versionsargument in einer Dockerfile. Das ist nützlich, wenn dein Container-Build die Anwendungsversion über ein Build-Argument einbettet.

## Installation

```bash
go install github.com/SemRels/updater-docker@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: updater-docker
    path: updater-docker
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
