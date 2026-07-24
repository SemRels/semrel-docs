---
title: "Plugin: updater-cargo"
description: Aktualisiert das Versionsfeld in einem Rust-Cargo-Manifest.
---

Aktualisiert das Versionsfeld in einem Rust-Cargo-Manifest. Nutze es, um `Cargo.toml` mit der von semrel für die Release gewählten Version synchron zu halten.

## Installation

```bash
semrel plugin install @semrel/updater-cargo
```

`semrel plugin install` lädt die Binärdatei nach `.semrel/plugins/` herunter und aktualisiert `.semrel.lock`. Committe `.semrel.lock`, um die Version für dein Team festzuschreiben.

## Konfiguration

```yaml
version: 1
plugins:
  - uses: @semrel/updater-cargo
    args:
      file: Cargo.toml
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_FILE` | nein | `Cargo.toml` | Cargo-Manifest, das aktualisiert werden soll. |

## Release-Kontextvariablen

- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_DRY_RUN`

## Verhalten

Für eine `1.4.0`-Release kann der Updater `version = "1.3.2"` in `Cargo.toml` zu `version = "1.4.0"` ändern.

## Quelle

- [SemRels/updater-cargo](https://github.com/SemRels/updater-cargo)
