---
title: "Plugin: updater-gradle"
description: Aktualisiert den Versionsschlüssel in einer Gradle-Properties-Datei.
---

Aktualisiert den Versionsschlüssel in einer Gradle-Properties-Datei. Nutze ihn, um Java- oder Kotlin-Projekte auf der von semrel ausgewählten Release-Version zu halten.

## Installation

```bash
go install github.com/SemRels/updater-gradle@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: updater-gradle
    path: updater-gradle
    args:
      file: gradle.properties
      key: version
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_FILE` | nein | `gradle.properties` | Gradle-Properties-Datei, die aktualisiert werden soll. |
| `SEMREL_PLUGIN_KEY` | nein | `version` | Property-Schlüssel, der die Version speichert. |

## Release-Kontextvariablen

- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_DRY_RUN`

## Verhalten

Für eine `1.4.0`-Release kann der Updater `version=1.3.2` in `gradle.properties` zu `version=1.4.0` umschreiben.

## Quelle

- [SemRels/updater-gradle](https://github.com/SemRels/updater-gradle)
