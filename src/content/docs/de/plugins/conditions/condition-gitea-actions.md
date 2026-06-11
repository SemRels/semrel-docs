---
title: "Plugin: condition-gitea-actions"
description: Bestätigt, dass die aktuelle Release innerhalb von Gitea Actions läuft.
---

Bestätigt, dass die aktuelle Release innerhalb von Gitea Actions läuft. Nutze es, um lokale oder fremde CI-Läufe daran zu hindern, offizielle Releases zu veröffentlichen.

## Installation

```bash
semrel plugin install @semrel/gitea-actions
```

`semrel plugin install` lädt die Binärdatei nach `.semrel/plugins/` herunter und aktualisiert `.semrel.lock`. Committe `.semrel.lock`, um die Version für dein Team festzuschreiben.

## Konfiguration

```yaml
version: 1
plugins:
  - uses: @semrel/gitea-actions
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| _None_ | nein | — | Dieses Plugin hat keine eigenen `SEMREL_PLUGIN_*`-Variablen. |

## Release-Kontextvariablen

Dieses Plugin benötigt keine der gemeinsamen `SEMREL_*`-Release-Kontextvariablen, um seine Aufgabe zu erledigen.

## Verhalten

Wenn `GITEA_ACTIONS=true`, ist die Bedingung erfüllt. Außerhalb von Gitea Actions beendet sich das Plugin mit einem Exit-Code ungleich null, sodass die Release nicht fortgesetzt wird.

## Quelle

- [SemRels/condition-gitea-actions](https://github.com/SemRels/condition-gitea-actions)
