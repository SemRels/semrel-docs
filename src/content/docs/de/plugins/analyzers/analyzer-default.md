---
title: "Plugin: analyzer-default"
description: Ermittelt den nächsten SemVer-Bump, indem Commit-Nachrichten mit regulären Ausdrücken abgeglichen werden.
---

Ermittelt den nächsten SemVer-Bump, indem Commit-Nachrichten mit regulären Ausdrücken abgeglichen werden. Wähle es, wenn du eigene Versionierungsregeln möchtest, ohne Conventional Commits einzuführen.

## Installation

```bash
go install github.com/SemRels/analyzer-default@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: analyzer-default
    path: analyzer-default
    args:
      major_pattern: 'BREAKING|major:'
      minor_pattern: '^feat'
      patch_pattern: '^fix|^perf'
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_MINOR_PATTERN` | nein | `plugin-defined regex` | Regulärer Ausdruck, der einen Minor-Bump auslöst. |
| `SEMREL_PLUGIN_PATCH_PATTERN` | nein | `plugin-defined regex` | Regulärer Ausdruck, der einen Patch-Bump auslöst. |
| `SEMREL_PLUGIN_MAJOR_PATTERN` | nein | `plugin-defined regex` | Regulärer Ausdruck, der einen Major-Bump auslöst. |

## Release-Kontextvariablen

Dieses Plugin benötigt keine der gemeinsamen `SEMREL_*`-Release-Kontextvariablen, um seine Aufgabe zu erledigen.

## Verhalten

Wenn eine Commit-Nachricht auf `major_pattern` passt, gibt der Analyzer `major` zurück. Andernfalls fällt er auf `minor_pattern` zurück, dann auf `patch_pattern`, und gibt den höchsten passenden Bump zurück.

## Quelle

- [SemRels/analyzer-default](https://github.com/SemRels/analyzer-default)
