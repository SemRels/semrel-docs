---
title: "Plugin: provider-gitlab"
description: Publishes releases to GitLab.
---

Publishes releases to GitLab. It supports GitLab.com and self-hosted GitLab instances through a configurable base URL.

## Installation

```bash
semrel plugin install @semrel/gitlab
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.

## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/gitlab
    args:
      # token is read from SEMREL_PLUGIN_TOKEN env var
      base_url: 'https://gitlab.com'
      project_id: 12345678
      milestone: v1.4.0
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_TOKEN` | yes | `—` | GitLab token used to create the release. |
| `SEMREL_PLUGIN_BASE_URL` | no | `https://gitlab.com` | Base URL for the GitLab instance. |
| `SEMREL_PLUGIN_PROJECT_ID` | no | `current project` | Numeric or URL-encoded project identifier. |
| `SEMREL_PLUGIN_MILESTONE` | no | `—` | Optional milestone to associate with the release. |

## Release Context Variables

- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_CHANGELOG`
- `SEMREL_DRY_RUN`

## Behavior

For `v1.4.0`, the provider can create a GitLab release tied to the tag, attach the changelog text, and link the configured milestone.

## Source

- [SemRels/provider-gitlab](https://github.com/SemRels/provider-gitlab)
