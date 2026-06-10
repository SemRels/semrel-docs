---
title: "Plugin: updater-go"
description: Aktualisiert eine Go-Quelldatei, die die Projektversion bereitstellt.
---

Aktualisiert eine Go-Quelldatei, die die Projektversion bereitstellt. Üblicherweise nutzt du ihn, um eine `version.go`-Konstante mit der semrel-Release-Version zu synchronisieren.

## Installation

```bash
go install github.com/SemRels/updater-go@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: updater-go
    path: updater-go
    args:
      file: version.go
      variable: Version
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_FILE` | nein | `version.go` | Go-Quelldatei, die aktualisiert werden soll. |
| `SEMREL_PLUGIN_VARIABLE` | nein | `Version` | Variablen- oder Konstantenname, der den Versionsstring hält. |

## Release-Kontextvariablen

- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_DRY_RUN`

## Verhalten

Für eine `1.4.0`-Release kann der Updater `const Version = "1.3.2"` zu `const Version = "1.4.0"` ändern.

## Quelle

- [SemRels/updater-go](https://github.com/SemRels/updater-go)
