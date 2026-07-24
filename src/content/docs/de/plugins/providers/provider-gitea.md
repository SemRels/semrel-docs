---
title: "Plugin: provider-gitea"
description: Veröffentlicht Releases in einer Gitea-Instanz.
---

Veröffentlicht Releases in einer Gitea-Instanz. Das passt gut für selbst gehostete Teams, die Repositories und Releases in Gitea verwalten.

## Installation

```bash
semrel plugin install @semrel/provider-gitea
```

`semrel plugin install` lädt die Binärdatei nach `.semrel/plugins/` herunter und aktualisiert `.semrel.lock`. Committe `.semrel.lock`, um die Version für dein Team festzuschreiben.

## Konfiguration

```yaml
version: 1
plugins:
  - uses: @semrel/provider-gitea
    args:
      base_url: 'https://gitea.example.com'
      # Token wird aus der Umgebungsvariable SEMREL_PLUGIN_TOKEN gelesen
      owner: SemRels
      repo: semrel
      draft: false
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_BASE_URL` | ja | `—` | Basis-URL der Gitea-Instanz. |
| `SEMREL_PLUGIN_TOKEN` | ja | `—` | API-Token für die Gitea-Authentifizierung. |
| `SEMREL_PLUGIN_OWNER` | nein | `aktueller Repository-Eigentümer` | Repository-Eigentümer oder Organisation. |
| `SEMREL_PLUGIN_REPO` | nein | `aktueller Repository-Name` | Repository-Name, in dem veröffentlicht wird. |
| `SEMREL_PLUGIN_DRAFT` | nein | `false` | Die Release als Draft erstellen. |

## Release-Kontextvariablen

- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_CHANGELOG`
- `SEMREL_DRY_RUN`

## Verhalten

Für `v1.4.0` kann der Provider eine Gitea-Release erstellen, die den semrel-Tag-Namen verwendet und den erzeugten Changelog-Text veröffentlicht.

## Quelle

- [SemRels/provider-gitea](https://github.com/SemRels/provider-gitea)
