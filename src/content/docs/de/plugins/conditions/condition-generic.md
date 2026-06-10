---
title: "Plugin: condition-generic"
description: Führt einen Shell-Befehl aus und besteht nur, wenn dieser Befehl mit Status 0 endet.
---

Führt einen Shell-Befehl aus und besteht nur, wenn dieser Befehl mit Status 0 endet. Nutze es, um Releases über eigene Branch-Prüfungen, den Repository-Zustand oder externe Validierungslogik abzusichern.

## Installation

```bash
go install github.com/SemRels/condition-generic@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: condition-generic
    path: condition-generic
    args:
      command: 'test "$SEMREL_BRANCH" = "main"'
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_COMMAND` | ja | `—` | Shell-Befehl, der mit Status 0 enden muss, damit die Bedingung erfüllt ist. |

## Release-Kontextvariablen

Das Plugin selbst liest nur `SEMREL_PLUGIN_COMMAND`, aber der von ihm ausgeführte Befehl erbt den vollständigen semrel-Release-Kontext:

- `SEMREL_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_BUMP`
- `SEMREL_BRANCH`
- `SEMREL_TAG_PREFIX`
- `SEMREL_CHANGELOG`
- `SEMREL_DRY_RUN`

## Verhalten

Mit `command: 'test "$SEMREL_BRANCH" = "main"'` beendet sich das Plugin auf `main` mit `0` und auf jeder anderen Branch mit einem Exit-Code ungleich null.

## Quelle

- [SemRels/condition-generic](https://github.com/SemRels/condition-generic)
