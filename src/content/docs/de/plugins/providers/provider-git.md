---
title: "Plugin: provider-git"
description: Erstellt Git-Tags und überträgt optional Branch-Updates über das lokale Git-Remote.
---

Erstellt Git-Tags und überträgt optional Branch-Updates über das lokale Git-Remote. Nutze es, wenn dein Release-Ablauf nur native Git-Operationen statt einer Forge-spezifischen API braucht.

## Installation

```bash
semrel plugin install @semrel/provider-git
```

`semrel plugin install` lädt die Binärdatei nach `.semrel/plugins/` herunter und aktualisiert `.semrel.lock`. Committe `.semrel.lock`, um die Version für dein Team festzuschreiben.

## Konfiguration

```yaml
version: 1
plugins:
  - uses: @semrel/provider-git
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

### GitLab-Releases

Wenn sowohl die Release-Commits auf dem GitLab-Branch als auch ein GitLab-Release-Eintrag benötigt werden, konfiguriere beide Provider:

```yaml
plugins:
  - uses: "@semrel/provider-git"
    phase: release
    args:
      push_branch: true
  - uses: "@semrel/provider-gitlab"
    phase: release
```

`provider-git` pusht das bereits lokal erstellte Tag und den Branch; `provider-gitlab` erstellt den Release-Eintrag. Die Reihenfolge ist wichtig. Git-Pushes verwenden die für das Git-Remote konfigurierten Zugangsdaten, nicht `SEMREL_PLUGIN_TOKEN`. In GitLab CI kann `origin` die `CI_JOB_TOKEN`-Zugangsdaten des Runners verwenden. Aktiviere dafür Git-Pushes mit Job-Token in den Projekteinstellungen und stelle sicher, dass der Benutzer des Tokens auf den Ziel-Branch pushen darf. Wenn `origin` bereits diesen Job-Token verwendet, ist kein `git remote set-url`-Schritt nötig.

## Quelle

- [SemRels/provider-git](https://github.com/SemRels/provider-git)
