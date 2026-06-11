---
title: "Plugin: condition-gitlab-ci"
description: Bestätigt, dass die aktuelle Release innerhalb von GitLab CI läuft.
---

Bestätigt, dass die aktuelle Release innerhalb von GitLab CI läuft. Das ist eine einfache Absicherung für Teams, die nur von GitLab verwalteten Pipelines vertrauen, wenn Versionen veröffentlicht werden.

## Installation

```bash
semrel plugin install @semrel/gitlab-ci
```

`semrel plugin install` lädt die Binärdatei nach `.semrel/plugins/` herunter und aktualisiert `.semrel.lock`. Committe `.semrel.lock`, um die Version für dein Team festzuschreiben.

## Konfiguration

```yaml
version: 1
plugins:
  - uses: @semrel/gitlab-ci
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
