---
title: "Plugin: provider-gitlab"
description: Veröffentlicht Releases in GitLab.
---

Veröffentlicht Releases in GitLab. Es unterstützt GitLab.com und selbst gehostete GitLab-Instanzen über eine konfigurierbare Basis-URL.

## Installation

```bash
go install github.com/SemRels/provider-gitlab@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: provider-gitlab
    path: provider-gitlab
    args:
      token: '${{ env.GITLAB_TOKEN }}'
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
