---
title: "Plugin: hook-email"
description: Sends release notifications through SMTP after a SemRel run.
---

Sends release notifications through SMTP after a SemRel run. It can deliver version, branch, and changelog details to release managers or stakeholder mailing lists.

## Installation

```bash
semrel plugin install @semrel/email
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.

## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/email
    args:
      smtp_host: smtp.example.com
      smtp_port: 587
      smtp_user: '${{ env.SMTP_USER }}'
      smtp_pass: '${{ env.SMTP_PASS }}'
      from: 'releases@example.com'
      to: 'team@example.com,ops@example.com'
      subject_template: 'Release {{ .TagName }} is live'
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_SMTP_HOST` | yes | `—` | SMTP server hostname. |
| `SEMREL_PLUGIN_SMTP_PORT` | no | `587` | SMTP server port. |
| `SEMREL_PLUGIN_SMTP_USER` | yes | `—` | SMTP username. |
| `SEMREL_PLUGIN_SMTP_PASS` | yes | `—` | SMTP password or app password. |
| `SEMREL_PLUGIN_FROM` | yes | `—` | Sender email address. |
| `SEMREL_PLUGIN_TO` | yes | `—` | Comma-separated list of recipient email addresses. |
| `SEMREL_PLUGIN_SUBJECT_TEMPLATE` | no | `plugin-defined` | Optional subject template for the release email. |
| `SEMREL_PLUGIN_TLS` | no | `true` | Enable or disable TLS for the SMTP connection. |

## Release Context Variables

- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_BUMP`
- `SEMREL_BRANCH`
- `SEMREL_CHANGELOG`
- `SEMREL_DRY_RUN`

## Example Output

A successful run can send an email with a subject such as `Release v1.4.0 is live` and a body that includes the bump level, branch, and generated changelog.

## Source

- [SemRels/hook-email](https://github.com/SemRels/hook-email)
