---
title: "Plugin: hook-gitplugin"
description: Überträgt Release-bezogene Änderungen in ein anderes Git-Repository oder eine andere Branch.
---

Überträgt Release-bezogene Änderungen in ein anderes Git-Repository oder eine andere Branch. Nutze ihn, wenn semrel Release-Metadaten in einen anderen Checkout oder ein Automatisierungs-Repository spiegeln soll.

## Installation

```bash
semrel plugin install @semrel/hook-gitplugin
```

`semrel plugin install` lädt die Binärdatei nach `.semrel/plugins/` herunter und aktualisiert `.semrel.lock`. Committe `.semrel.lock`, um die Version für dein Team festzuschreiben.

## Konfiguration

```yaml
version: 1
plugins:
  - uses: @semrel/hook-gitplugin
    args:
      repo: 'https://github.com/SemRels/release-mirror.git'
      branch: main
      # Token wird aus der Umgebungsvariable SEMREL_PLUGIN_TOKEN gelesen
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_REPO` | ja | `—` | Git-Repository-URL oder Pfad, der aktualisiert werden soll. |
| `SEMREL_PLUGIN_BRANCH` | nein | `main` | Ziel-Branch für den Push. |
| `SEMREL_PLUGIN_TOKEN` | nein | `—` | Optionaler Token für authentifizierte Pushes. |

## Release-Kontextvariablen

- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_BRANCH`
- `SEMREL_CHANGELOG`
- `SEMREL_DRY_RUN`

## Verhalten

Für eine `v1.4.0`-Release kann der Hook das konfigurierte Repository klonen, Release-Artefakte auf `main` aktualisieren und den resultierenden Commit pushen, nachdem semrel erfolgreich abgeschlossen wurde.

## Quelle

- [SemRels/hook-gitplugin](https://github.com/SemRels/hook-gitplugin)
