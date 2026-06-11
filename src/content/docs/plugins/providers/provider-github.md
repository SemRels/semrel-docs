---
title: "Plugin: provider-github"
description: Publishes releases to GitHub using the generated SemRel tag, version, and changelog.
---

Publishes releases to GitHub using the generated SemRel tag, version, and changelog. It supports draft and prerelease flags and can upload matching assets from the local workspace.

## Installation

```bash
semrel plugin install @semrel/github
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.

## Configuration

```yaml
version: 1
plugins:
  - uses: @semrel/github
    args:
      # token is read from SEMREL_PLUGIN_TOKEN env var
      owner: SemRels
      repo: semrel
      draft: false
      prerelease: false
      asset_glob: 'dist/*'
```

## Environment Variables

| Name | Required | Default | Description |
| --- | --- | --- | --- |
| `SEMREL_PLUGIN_TOKEN` | yes | `—` | GitHub token used to create the release. |
| `SEMREL_PLUGIN_OWNER` | no | `current repository owner` | Repository owner or organization. |
| `SEMREL_PLUGIN_REPO` | no | `current repository name` | Repository name to publish into. |
| `SEMREL_PLUGIN_DRAFT` | no | `false` | Create the release as a draft. |
| `SEMREL_PLUGIN_PRERELEASE` | no | `false` | Mark the release as a prerelease. |
| `SEMREL_PLUGIN_ASSET_GLOB` | no | `—` | Glob pattern for release assets to upload. |

## Release Context Variables

- `SEMREL_TAG_NAME`
- `SEMREL_NEXT_VERSION`
- `SEMREL_CURRENT_VERSION`
- `SEMREL_CHANGELOG`
- `SEMREL_DRY_RUN`

## Behavior

For `v1.4.0`, the provider can create a GitHub release, attach files matching `dist/*`, and publish the SemRel changelog as the release notes.

## Source

- [SemRels/provider-github](https://github.com/SemRels/provider-github)
