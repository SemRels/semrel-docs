---
title: "Plugin: provider-gitlab"
description: Veröffentlicht Releases in GitLab.
---

Veröffentlicht Releases in GitLab. Es unterstützt GitLab.com und selbst gehostete GitLab-Instanzen über eine konfigurierbare Basis-URL.

## Installation

```bash
semrel plugin install @semrel/gitlab
```

`semrel plugin install` lädt die Binärdatei nach `.semrel/plugins/` herunter und aktualisiert `.semrel.lock`. Committe `.semrel.lock`, um die Version für dein Team festzuschreiben.

## Konfiguration

```yaml
version: 1
plugins:
  - uses: @semrel/gitlab
    args:
      # Token wird aus der Umgebungsvariable SEMREL_PLUGIN_TOKEN gelesen
      base_url: 'https://gitlab.com'
      project_id: 12345678
      milestone: v1.4.0
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_TOKEN` | ja | `—` | GitLab-Token, das zum Erstellen der Release verwendet wird. |
| `SEMREL_PLUGIN_BASE_URL` | nein | `https://gitlab.com` | Basis-URL der GitLab-Instanz. |
| `SEMREL_PLUGIN_PROJECT_ID` | nein | `aktuelles Projekt` | Numerische oder URL-kodierte Projektkennung. |
| `SEMREL_PLUGIN_MILESTONE` | nein | `—` | Optionales Milestone, das mit der Release verknüpft wird. |

## Release-Kontextvariablen

- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_CHANGELOG`
- `SEMREL_DRY_RUN`

## Verhalten

Für `v1.4.0` kann der Provider eine GitLab-Release anlegen, die an das Tag gebunden ist, den Changelog-Text anhängen und das konfigurierte Milestone verknüpfen.

## Quelle

- [SemRels/provider-gitlab](https://github.com/SemRels/provider-gitlab)
