---
title: "Plugin: updater-maven"
description: Aktualisiert die in einer Maven-`pom.xml`-Datei deklarierte Version.
---

Aktualisiert die in einer Maven-`pom.xml`-Datei deklarierte Version. Das ist nützlich für Java-Projekte, die ihre kanonische Version in Maven-Metadaten verwalten.

## Installation

```bash
go install github.com/SemRels/updater-maven@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: updater-maven
    path: updater-maven
    args:
      file: pom.xml
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_FILE` | nein | `pom.xml` | Maven-POM-Datei, die aktualisiert werden soll. |

## Release-Kontextvariablen

- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_DRY_RUN`

## Verhalten

Für eine `1.4.0`-Release kann der Updater `<version>1.3.2</version>` in `pom.xml` durch `<version>1.4.0</version>` ersetzen.

## Quelle

- [SemRels/updater-maven](https://github.com/SemRels/updater-maven)
