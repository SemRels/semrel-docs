---
title: "Plugin: updater-maven"
description: Aktualisiert die in einer Maven-`pom.xml`-Datei deklarierte Version.
---

Aktualisiert die in einer Maven-`pom.xml`-Datei deklarierte Version. Das ist nützlich für Java-Projekte, die ihre kanonische Version in Maven-Metadaten verwalten.

## Installation

```bash
semrel plugin install @semrel/updater-maven
```

`semrel plugin install` lädt die Binärdatei nach `.semrel/plugins/` herunter und aktualisiert `.semrel.lock`. Committe `.semrel.lock`, um die Version für dein Team festzuschreiben.

## Konfiguration

```yaml
version: 1
plugins:
  - uses: @semrel/updater-maven
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
