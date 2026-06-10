---
title: "Plugin: condition-github-actions"
description: Bestätigt, dass die aktuelle Release innerhalb von GitHub Actions läuft.
---

Bestätigt, dass die aktuelle Release innerhalb von GitHub Actions läuft. Das ist nützlich, wenn Releases nur aus deiner in GitHub gehosteten CI-Pipeline erfolgen sollen.

## Installation

```bash
go install github.com/SemRels/condition-github-actions@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: condition-github-actions
    path: condition-github-actions
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| _None_ | nein | — | Dieses Plugin hat keine eigenen `SEMREL_PLUGIN_*`-Variablen. |

## Release-Kontextvariablen

Dieses Plugin benötigt keine der gemeinsamen `SEMREL_*`-Release-Kontextvariablen, um seine Aufgabe zu erledigen.

## Verhalten

Wenn `GITHUB_ACTIONS=true`, ist das Plugin sofort erfolgreich. Fehlt die Variable oder ist sie auf einen anderen Wert gesetzt, schlägt die Bedingung fehl und semrel stoppt die Pipeline.

## Quelle

- [SemRels/condition-github-actions](https://github.com/SemRels/condition-github-actions)
