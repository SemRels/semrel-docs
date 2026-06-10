---
title: "Plugin: analyzer-conventional"
description: Ermittelt den nächsten SemVer-Bump aus Conventional-Commit-Nachrichten.
---

Ermittelt den nächsten SemVer-Bump aus Conventional-Commit-Nachrichten. Es ordnet Commit-Typen und Marker für Breaking Changes den Entscheidungen `major`, `minor` oder `patch` zu.

## Installation

```bash
go install github.com/SemRels/analyzer-conventional@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: analyzer-conventional
    path: analyzer-conventional
    args:
      breaking_change_label: 'BREAKING CHANGE'
      minor_types: feat
      patch_types: 'fix,perf,refactor'
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_BREAKING_CHANGE_LABEL` | nein | `BREAKING CHANGE` | Footer-Label zum Erkennen von Breaking Changes. |
| `SEMREL_PLUGIN_MINOR_TYPES` | nein | `feat` | Kommagetrennte Commit-Typen, die einen Minor-Bump auslösen. |
| `SEMREL_PLUGIN_PATCH_TYPES` | nein | `fix,perf,refactor` | Kommagetrennte Commit-Typen, die einen Patch-Bump auslösen. |

## Release-Kontextvariablen

Dieses Plugin benötigt keine der gemeinsamen `SEMREL_*`-Release-Kontextvariablen, um seine Aufgabe zu erledigen.

## Verhalten

Bei den Commits `feat(api): add search endpoint` und `fix(ui): handle empty state` gibt der Analyzer einen `minor`-Bump zurück, weil `feat` höher gewichtet wird als `fix`.

## Quelle

- [SemRels/analyzer-conventional](https://github.com/SemRels/analyzer-conventional)
