---
title: "Plugin: updater-terraform"
description: Aktualisiert eine Terraform-Variable, die die Anwendungsversion speichert.
---

Aktualisiert eine Terraform-Variable, die die Anwendungsversion speichert. Das ist nützlich, wenn Terraform-Module oder Deployments die neue Release-Version in ihre Konfiguration schreiben müssen.

## Installation

```bash
go install github.com/SemRels/updater-terraform@latest
```

Jedes Plugin ist eine eigenständige Go-Binärdatei. Lass es in deinem `PATH` oder referenziere es mit `path:` in `.semrel.yaml`. Wenn du Geheimnisse in einer `.env`-Datei speicherst, lade sie mit `semrel --env-file .env release`.

## Konfiguration

```yaml
version: 1
plugins:
  - name: updater-terraform
    path: updater-terraform
    args:
      file: variables.tf
      variable: app_version
```

## Umgebungsvariablen

| Name | Erforderlich | Standard | Beschreibung |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_FILE` | nein | `variables.tf` | Terraform-Datei, die aktualisiert werden soll. |
| `SEMREL_PLUGIN_VARIABLE` | nein | `app_version` | Name der Terraform-Variablen, die die Release-Version speichert. |

## Release-Kontextvariablen

- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_TAG_NAME`
- `SEMREL_DRY_RUN`

## Verhalten

Für eine `1.4.0`-Release kann der Updater `default = "1.3.2"` für die konfigurierte Terraform-Variable zu `default = "1.4.0"` ändern.

## Quelle

- [SemRels/updater-terraform](https://github.com/SemRels/updater-terraform)
