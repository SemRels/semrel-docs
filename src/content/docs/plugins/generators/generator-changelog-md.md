---
title: "Plugin: generator-changelog-md"
description: Generates an enhanced Markdown CHANGELOG.md with commit grouping, PR links, and optional archiving.
---

import { Aside } from '@astrojs/starlight/components';

Generates an enhanced Markdown `CHANGELOG.md` with commit grouping, PR/commit linkification, contributor sections, and optional entry archiving. Use it as a replacement for semrel's built-in changelog writer when you need a richer format.

## Installation

```bash
semrel plugin install @semrel/generator-changelog-md
```

`semrel plugin install` downloads the binary to `.semrel/plugins/` and updates `.semrel.lock`. Commit `.semrel.lock` to pin the version for your team.

## Configuration

<Aside type="important" title="Required: set commit_changelog and keep_releases">

Two settings are **mandatory** for the plugin to write `CHANGELOG.md` to disk:

1. `commit_changelog: false` — tells semrel to skip its built-in write and let the plugin handle it.
2. `keep_releases: "1"` (or higher) — without this the plugin only outputs to stdout and writes nothing.

</Aside>

```yaml
# .semrel.yaml
commit_changelog: false   # skip built-in writer; plugin handles CHANGELOG.md

plugins:
  - uses: @semrel/condition-gitlab-ci
    phase: condition

  - uses: @semrel/generator-changelog-md
    phase: pre-tag          # must be pre-tag — runs before the tag, auto-committed by semrel
    args:
      keep_releases: "10"   # keep 10 full entries; older ones are summarised

  - uses: @semrel/gitlab
```

## How it works

1. semrel generates the release version and collects commits (`SEMREL_CHANGELOG` env var).
2. The `generator-changelog-md` plugin receives `SEMREL_CHANGELOG` and writes an enhanced `CHANGELOG.md` directly to disk (`keep_releases > 0` required).
3. semrel auto-commits any modified tracked files (including `CHANGELOG.md`) before creating the git tag.
4. The tag points to the commit that includes the enhanced changelog.

## Environment variables

| Name | Required | Default | Description |
|---|---|---|---|
| `SEMREL_PLUGIN_KEEP_RELEASES` | **Yes** (to write to disk) | `0` | Number of releases to keep fully expanded. `0` = stdout only, nothing written to disk. |
| `SEMREL_PLUGIN_TEMPLATE` | no | built-in | Path to a custom Go template. |
| `SEMREL_PLUGIN_MAX_COMMITS` | no | `100` | Maximum commits to include. |
| `SEMREL_PLUGIN_GROUP_BY_TYPE` | no | `true` | Group commits by Conventional Commit type. |
| `SEMREL_PLUGIN_LINK_PRS` | no | `true` | Linkify `(#123)` PR references. |
| `SEMREL_PLUGIN_LINK_COMMITS` | no | `true` | Linkify 40-char commit SHAs. |
| `SEMREL_PLUGIN_CHANGELOG_FILE` | no | `CHANGELOG.md` | Output file path. |

## Source

- [SemRels/generator-changelog-md](https://github.com/SemRels/generator-changelog-md)
