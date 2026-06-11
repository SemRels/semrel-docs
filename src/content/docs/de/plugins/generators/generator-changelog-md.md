---
title: "Plugin: generator-changelog-md"
description: Erzeugt ein erweitertes Markdown-CHANGELOG.md mit Commit-Gruppierung, PR-Links und optionaler Archivierung.
---

import { Aside } from '@astrojs/starlight/components';

Erzeugt ein erweitertes Markdown-`CHANGELOG.md` mit Commit-Gruppierung, PR/Commit-Verlinkung, Contributor-Sektionen und optionaler Eintrags-Archivierung. Als Ersatz für semrels eingebauten Changelog-Writer verwenden, wenn ein reichhaltigeres Format gewünscht wird.

## Installation

```bash
semrel plugin install @semrel/generator-changelog-md
```

`semrel plugin install` lädt die Binary nach `.semrel/plugins/` herunter und aktualisiert `.semrel.lock`. `.semrel.lock` committen, um die Version für das Team zu pinnen.

## Konfiguration

<Aside type="important" title="Pflicht: commit_changelog und keep_releases setzen">

Zwei Einstellungen sind **Pflicht**, damit das Plugin `CHANGELOG.md` auf die Disk schreibt:

1. `commit_changelog: false` — weist semrel an, den eingebauten Schreiber zu überspringen und das Plugin die Datei verwalten zu lassen.
2. `keep_releases: "1"` (oder höher) — ohne diesen Wert gibt das Plugin nur auf stdout aus und schreibt nichts.

</Aside>

```yaml
# .semrel.yaml
commit_changelog: false   # eingebauten Schreiber überspringen; Plugin übernimmt CHANGELOG.md

plugins:
  - uses: @semrel/condition-gitlab-ci
    phase: condition

  - uses: @semrel/generator-changelog-md
    phase: pre-tag          # muss pre-tag sein — läuft vor dem Tag, wird von semrel auto-committed
    args:
      keep_releases: "10"   # 10 vollständige Einträge behalten; ältere werden zusammengefasst

  - uses: @semrel/gitlab
```

## Wie es funktioniert

1. semrel berechnet die Release-Version und sammelt Commits (`SEMREL_CHANGELOG` env var).
2. Das `generator-changelog-md`-Plugin empfängt `SEMREL_CHANGELOG` und schreibt ein erweitertes `CHANGELOG.md` direkt auf die Disk (`keep_releases > 0` erforderlich).
3. semrel committed automatisch alle geänderten, getrackte Dateien (inkl. `CHANGELOG.md`) bevor der Git-Tag erstellt wird.
4. Der Tag zeigt auf den Commit mit dem erweiterten Changelog.

## Umgebungsvariablen

| Name | Pflicht | Standard | Beschreibung |
|---|---|---|---|
| `SEMREL_PLUGIN_KEEP_RELEASES` | **Ja** (für Disk-Write) | `0` | Anzahl voll expandierter Einträge. `0` = nur stdout, nichts auf Disk geschrieben. |
| `SEMREL_PLUGIN_TEMPLATE` | nein | eingebaut | Pfad zu einem eigenen Go-Template. |
| `SEMREL_PLUGIN_MAX_COMMITS` | nein | `100` | Maximale Anzahl enthaltener Commits. |
| `SEMREL_PLUGIN_GROUP_BY_TYPE` | nein | `true` | Commits nach Conventional-Commit-Typ gruppieren. |
| `SEMREL_PLUGIN_LINK_PRS` | nein | `true` | `(#123)` PR-Referenzen verlinken. |
| `SEMREL_PLUGIN_LINK_COMMITS` | nein | `true` | 40-Zeichen-Commit-SHAs verlinken. |
| `SEMREL_PLUGIN_CHANGELOG_FILE` | nein | `CHANGELOG.md` | Ausgabedateipfad. |

## Quellcode

- [SemRels/generator-changelog-md](https://github.com/SemRels/generator-changelog-md)
