---
title: "Plugin: condition-github-actions"
description: Bestätigt, dass die aktuelle Release innerhalb von GitHub Actions läuft.
---

Bestätigt, dass die aktuelle Release innerhalb von GitHub Actions läuft. Das ist nützlich, wenn Releases nur aus deiner in GitHub gehosteten CI-Pipeline erfolgen sollen.

## Installation

```bash
semrel plugin install @semrel/condition-github-actions
```

`semrel plugin install` lädt die Binärdatei nach `.semrel/plugins/` herunter und aktualisiert `.semrel.lock`. Committe `.semrel.lock`, um die Version für dein Team festzuschreiben.

## Konfiguration

```yaml
version: 1
plugins:
  - uses: @semrel/condition-github-actions
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
