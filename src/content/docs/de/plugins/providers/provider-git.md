---
title: "Plugin: provider-git"
description: Erstellt Git-Tags und überträgt optional Branch-Updates über das lokale Git-Remote.
---

Erstellt Git-Tags und überträgt optional Branch-Updates über das lokale Git-Remote. Nutze es, wenn dein Release-Ablauf nur native Git-Operationen statt einer Forge-spezifischen API braucht.

## Installation

```bash
go install github.com/SemRels/provider-git@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: provider-git
    path: provider-git
    args:
      remote: origin
      push_branch: true
      signing_key: ABCDEF1234567890
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_REMOTE` | nein | `origin` | Name des Remote für Push-Operationen. |
| `SEMREL_PLUGIN_SIGNING_KEY` | nein | `—` | Optionaler Signaturschlüssel für annotierte oder signierte Tags. |
| `SEMREL_PLUGIN_PUSH_BRANCH` | nein | `false` | Die aktuelle Branch zusätzlich zum Tag pushen. |

## Release-Kontextvariablen

- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_BRANCH`
- `SEMREL_TAG_PREFIX`
- `SEMREL_DRY_RUN`

## Verhalten

Für `v1.4.0` kann der Provider das Tag lokal erstellen und nach `origin` pushen. Wenn `push_branch` auf `true` steht, kann er auch den Release-Commit auf der aktuellen Branch pushen.

## Quelle

- [SemRels/provider-git](https://github.com/SemRels/provider-git)
