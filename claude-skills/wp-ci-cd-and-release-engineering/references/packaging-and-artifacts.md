# Packaging and Artifact Verification Guide

Use this reference when reviewing how WordPress plugins, themes, or related apps are packaged for release.

## Core Rule

Do not assume the repository tree is the shipped artifact. Review the actual release bundle path.

## Packaging Checklist

### For Plugins and Themes

Check whether the release artifact:
- includes only runtime-required files
- excludes test fixtures, local config, editor junk, and source-only assets when appropriate
- contains compiled assets if the target runtime does not build them
- keeps version metadata aligned across the canonical files

### Build Reproducibility

Questions to ask:
- Is the build based on lockfiles (`composer.lock`, `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`)?
- Does CI use `npm ci` / locked dependency install rather than mutable installs for release builds?
- Is the artifact built once and reused, or recompiled separately in each environment?

### Verification Steps

Useful checks include:
- list artifact contents before deploy
- compare artifact version against git tag
- smoke-test install the zip in a clean WordPress environment
- report checksum or artifact filename in release logs

## Common Review Findings

### Smell: Dirty-Tree Packaging

```bash
zip -r plugin.zip .
```

Why it is risky:
- can include untracked or local-only files
- may not reflect the reviewed commit
- hides exactly what users receive

Safer direction:
- stage packaging from a clean checkout or explicit build directory
- assemble the artifact from a known include/exclude list

### Smell: Validation and Packaging Diverge

```yaml
- run: npm test
- run: composer install
- run: zip -r plugin.zip .
```

Why it is risky:
- the validated dependency tree may not match the packaged one
- packaging may include development dependencies or omit built assets

Safer direction:
- make packaging consume the same built output that validation inspected
- add an artifact inspection step after packaging

## WordPress-Specific Prompts

- Is `readme.txt` part of the release path and validated?
- For themes, does the zip include compiled CSS/JS required by the active theme?
- For plugins, does the artifact preserve the expected root directory name and main plugin file path?
- For WordPress.org releases, are assets and tags handled separately from trunk intentionally?
