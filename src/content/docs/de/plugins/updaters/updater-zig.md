---
title: "Plugin: updater-zig"
description: Aktualisiert das Versionsfeld in einem Zig-build.zig.zon-Manifest.
---

Aktualisiert das Versionsfeld in einem [Zig](https://ziglang.org)-`build.zig.zon`-Manifest. Nutze es, um die Version deines Zig-Pakets mit der von semrel für die Release gewählten Version synchron zu halten.

## Installation

```bash
semrel plugin install @semrel/updater-zig
```

`semrel plugin install` lädt die Binärdatei nach `.semrel/plugins/` herunter und aktualisiert `.semrel.lock`. Committe `.semrel.lock`, um die Version für dein Team festzuschreiben.

## Konfiguration

```yaml
version: 1
plugins:
  - uses: @semrel/updater-zig
    args:
      file: build.zig.zon
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_FILE` | nein | `build.zig.zon` | build.zig.zon-Manifest, das aktualisiert werden soll. |

## Release-Kontextvariablen

- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_DRY_RUN`

## Verhalten

`build.zig.zon` ist in ZON (Zig Object Notation) geschrieben: ein einziges anonymes Struct-Literal ohne `[section]`-Kopfzeilen, weshalb sich der Updater nicht auf eine TOML-artige Sektionierung verlassen kann. Er verfolgt die Klammerntiefe beim Einlesen der Datei und schreibt ausschließlich das oberste `.version = "..."`-Feld um — alles innerhalb von `.dependencies = .{ ... }` bleibt unangetastet. Die Identitätsfelder `.name` und `.fingerprint` werden nie verändert.

Für eine `1.4.0`-Release ändert der Updater:

```zon
.{
    .name = .my_lib,
    .version = "1.3.2",
    .fingerprint = 0xdeadbeefcafef00d,
    .dependencies = .{ ... },
}
```

zu:

```zon
.{
    .name = .my_lib,
    .version = "1.4.0",
    .fingerprint = 0xdeadbeefcafef00d,
    .dependencies = .{ ... },
}
```

## Quelle

- [SemRels/updater-zig](https://github.com/SemRels/updater-zig)
