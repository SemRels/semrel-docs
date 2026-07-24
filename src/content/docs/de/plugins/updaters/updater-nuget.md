---
title: "Plugin: updater-nuget"
description: Aktualisiert die Versionseigenschaft in einer `.csproj`- oder anderen NuGet-Projektdatei.
---

Aktualisiert die Versionseigenschaft in einer `.csproj`- oder anderen NuGet-Projektdatei. Das hilft dir, .NET-Paketmetadaten mit semrel-Releases synchron zu halten.

## Installation

```bash
semrel plugin install @semrel/updater-nuget
```

`semrel plugin install` lädt die Binärdatei nach `.semrel/plugins/` herunter und aktualisiert `.semrel.lock`. Committe `.semrel.lock`, um die Version für dein Team festzuschreiben.

## Konfiguration

```yaml
version: 1
plugins:
  - uses: @semrel/updater-nuget
    args:
      file: src/App/App.csproj
      property: Version
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_FILE` | nein | `*.csproj` | Projektdatei oder Glob, die bzw. der aktualisiert werden soll. |
| `SEMREL_PLUGIN_PROPERTY` | nein | `Version` | XML-Eigenschaft, die die Paketversion speichert. |

## Release-Kontextvariablen

- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_DRY_RUN`

## Verhalten

Für eine `1.4.0`-Release kann der Updater `<Version>1.3.2</Version>` zu `<Version>1.4.0</Version>` ändern.

## Quelle

- [SemRels/updater-nuget](https://github.com/SemRels/updater-nuget)
