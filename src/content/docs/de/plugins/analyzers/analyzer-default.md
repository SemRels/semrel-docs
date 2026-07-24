---
title: "Plugin: analyzer-default"
description: Ermittelt den nächsten SemVer-Bump, indem Commit-Nachrichten mit regulären Ausdrücken abgeglichen werden.
---

Ermittelt den nächsten SemVer-Bump, indem Commit-Nachrichten mit regulären Ausdrücken abgeglichen werden. Wähle es, wenn du eigene Versionierungsregeln möchtest, ohne Conventional Commits einzuführen.

## Installation

```bash
semrel plugin install @semrel/analyzer-default
```

`semrel plugin install` lädt die Binärdatei nach `.semrel/plugins/` herunter und aktualisiert `.semrel.lock`. Committe `.semrel.lock`, um die Version für dein Team festzuschreiben.

## Konfiguration

```yaml
version: 1
plugins:
  - uses: @semrel/analyzer-default
    args:
      major_pattern: 'BREAKING|major:'
      minor_pattern: '^feat'
      patch_pattern: '^fix|^perf'
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_MINOR_PATTERN` | nein | `vom Plugin definierter regulärer Ausdruck` | Regulärer Ausdruck, der einen Minor-Bump auslöst. |
| `SEMREL_PLUGIN_PATCH_PATTERN` | nein | `vom Plugin definierter regulärer Ausdruck` | Regulärer Ausdruck, der einen Patch-Bump auslöst. |
| `SEMREL_PLUGIN_MAJOR_PATTERN` | nein | `vom Plugin definierter regulärer Ausdruck` | Regulärer Ausdruck, der einen Major-Bump auslöst. |

## Release-Kontextvariablen

Dieses Plugin benötigt keine der gemeinsamen `SEMREL_*`-Release-Kontextvariablen, um seine Aufgabe zu erledigen.

## Verhalten

Wenn eine Commit-Nachricht auf `major_pattern` passt, gibt der Analyzer `major` zurück. Andernfalls fällt er auf `minor_pattern` zurück, dann auf `patch_pattern`, und gibt den höchsten passenden Bump zurück.

## Quelle

- [SemRels/analyzer-default](https://github.com/SemRels/analyzer-default)
