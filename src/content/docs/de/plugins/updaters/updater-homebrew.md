---
title: "Plugin: updater-homebrew"
description: Aktualisiert eine Homebrew-Formula mit der neuen Release-URL und Prüfsumme.
---

Aktualisiert eine Homebrew-Formula mit der neuen Release-URL und Prüfsumme. Nutze ihn, wenn semrel Tarballs veröffentlicht, die auch in einem Homebrew-Tap abgebildet werden müssen.

## Installation

```bash
go install github.com/SemRels/updater-homebrew@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: updater-homebrew
    path: updater-homebrew
    args:
      formula_file: Formula/semrel.rb
      url_template: 'https://github.com/SemRels/semrel/archive/refs/tags/v{{ .NextVersion }}.tar.gz'
      sha256: '${{ env.RELEASE_SHA256 }}'
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_FORMULA_FILE` | ja | `—` | Homebrew-Formula-Datei, die aktualisiert werden soll. |
| `SEMREL_PLUGIN_URL_TEMPLATE` | nein | `plugin-defined` | Template zum Erzeugen der Download-URL für die neue Release. |
| `SEMREL_PLUGIN_SHA256` | nein | `—` | Prüfsumme, die in die Formula geschrieben werden soll. |

## Release-Kontextvariablen

- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_DRY_RUN`

## Verhalten

Für eine `1.4.0`-Release kann der Updater die Formula-URL auf das Archiv `v1.4.0` umschreiben und den Wert `sha256` durch die angegebene Prüfsumme ersetzen.

## Quelle

- [SemRels/updater-homebrew](https://github.com/SemRels/updater-homebrew)
