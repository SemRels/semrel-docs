---
title: "Plugin: condition-github-actions"
description: Confirms the current release is running inside GitHub Actions.
---

Confirms the current release is running inside GitHub Actions. It is useful when you want releases to happen only from your GitHub-hosted CI pipeline.

## Installation

```bash
semrel plugin install @semrel/github-actions
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.

## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/github-actions
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| _None_ | no | — | This plugin has no dedicated `SEMREL_PLUGIN_*` variables. |

## Release Context Variables

This plugin does not require any of the shared `SEMREL_*` release context variables to do its job.

## Behavior

When `GITHUB_ACTIONS=true`, the plugin succeeds immediately. If the variable is missing or set to another value, the condition fails and SemRel stops the pipeline.

## Source

- [SemRels/condition-github-actions](https://github.com/SemRels/condition-github-actions)
