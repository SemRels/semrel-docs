---
title: "Plugin: condition-gitlab-ci"
description: Bestätigt, dass die aktuelle Release innerhalb von GitLab CI läuft.
---

Bestätigt, dass die aktuelle Release innerhalb von GitLab CI läuft. Das ist eine einfache Absicherung für Teams, die nur von GitLab verwalteten Pipelines vertrauen, wenn Versionen veröffentlicht werden.

## Installation

```bash
go install github.com/SemRels/condition-gitlab-ci@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: condition-gitlab-ci
    path: condition-gitlab-ci
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| _None_ | nein | — | Dieses Plugin hat keine eigenen `SEMREL_PLUGIN_*`-Variablen. |

## Release-Kontextvariablen

Dieses Plugin benötigt keine der gemeinsamen `SEMREL_*`-Release-Kontextvariablen, um seine Aufgabe zu erledigen.

## Verhalten

Wenn `GITLAB_CI=true`, ist das Plugin erfolgreich. Auf Entwicklerrechnern oder in anderen CI-Systemen schlägt es fehl und verhindert den Release-Schritt.

## Quelle

- [SemRels/condition-gitlab-ci](https://github.com/SemRels/condition-gitlab-ci)
