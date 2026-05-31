---
name: wp-ci-cd-and-release-engineering
description: WordPress CI/CD and release engineering review guidance. Use when reviewing GitHub Actions, deployment pipelines, Composer/npm build steps, plugin/theme packaging, release automation, secrets handling, SVN deploy flows for WordPress.org, staged rollouts, rollback plans, or when user mentions CI, CD, release pipeline, GitHub Actions, deployment workflow, build artifact, plugin zip, or release engineering. Helps review build reproducibility, packaging correctness, secret boundaries, deployment safety, rollback readiness, and WordPress-specific release pitfalls.
---

# WordPress CI/CD and Release Engineering Skill

## Overview

Systematic review guidance for WordPress delivery pipelines. **Core principle:** releases should be reproducible, scoped to the real artifact being shipped, and explicit about which environment, credentials, and validation gates are involved before anything reaches users or production infrastructure.

## When to Use

**Use when:**
- Reviewing GitHub Actions or other CI/CD workflows for WordPress plugins, themes, or headless projects
- Auditing packaging/release scripts and deploy jobs
- Checking WordPress.org SVN deploy flows, artifact generation, or release tagging
- Reviewing environment-secret handling for deploys, build steps, or preview environments
- Planning staged rollout, rollback, or pre-release verification workflows

**Don't use for:**
- Pure code-level plugin architecture with no pipeline/release concerns (use `wp-plugin-development`)
- Static analysis setup only (use `wp-phpstan-review`)
- Operational runtime maintenance tasks centered on WP-CLI (use `wp-wpcli-and-ops`)
- Headless cache/revalidation architecture without deployment pipeline focus (use `wp-headless-and-wpgraphql`)

## Code Review Workflow

1. **Identify the delivery surface**
   - GitHub Actions / CI config files
   - release scripts, shell helpers, Composer/npm build commands
   - packaging steps that create plugin/theme zips
   - deployment docs, release checklists, or WordPress.org publish automation

2. **Check artifact boundaries first**
   - What exact files are shipped to production or to WordPress.org?
   - Is the deploy artifact built once and promoted, or rebuilt differently per environment?
   - Are dev-only files, tests, source maps, secrets, or local config leaking into release artifacts?

3. **Review environment and secret handling**
   - Are secrets limited to the jobs that actually need them?
   - Are production deploys gated by branch/tag/environment protections?
   - Do preview/staging jobs use separate credentials and destinations?

4. **Review validation and reproducibility**
   - Are lint/tests/build steps executed before packaging or deploy?
   - Are dependency installs pinned/locked enough for reproducible releases?
   - Is the generated artifact validated rather than assuming the repo tree equals the shipped code?

5. **Review rollback and release operations**
   - Is there a documented rollback path?
   - Can operators identify which version/artifact is live?
   - Are releases idempotent or likely to partially deploy on rerun?

6. **Classify findings**
   - **CRITICAL:** production deploy without protections, secret exposure, artifact mismatch, unreviewed direct-to-prod release, or non-reproducible rebuilds that can ship different code from what passed CI
   - **WARNING:** weak gating, missing artifact validation, fragile tag/version sync, no rollback notes, deploy steps coupled to local assumptions
   - **INFO:** could improve caching, matrix strategy, changelog automation, or release observability

## File-Type Specific Checks

### GitHub Actions / CI Workflows

- CRITICAL: deploy job runs on every push to an unprotected branch
- CRITICAL: secrets echoed, written to artifacts, or exposed to unnecessary jobs
- WARNING: build/test/package/deploy concerns collapsed into one opaque job
- WARNING: workflow uses floating tools/actions carelessly on security-sensitive paths
- INFO: could split verification, packaging, and release into clearer stages

### Packaging and Build Scripts

- CRITICAL: release zip built from a dirty working tree or from files different from the reviewed commit
- WARNING: `node_modules`, tests, screenshots, or local config included unintentionally
- WARNING: Composer/npm install mode differs between CI validation and release packaging in a way that changes the artifact
- INFO: could add explicit artifact inspection or checksum reporting

### WordPress.org / SVN Release Flows

- CRITICAL: tag and stable-tag drift can publish the wrong version
- WARNING: deploy script assumes local SVN state or manual copy steps without verification
- WARNING: readme/version metadata not validated before publish
- INFO: could document dry-run or preflight checks before SVN push

### Environment Promotion and Rollback

- CRITICAL: same credentials or target used for staging and production without clear guardrails
- WARNING: no rollback script/runbook or no artifact retention
- WARNING: production health verification absent after deploy
- INFO: could surface release IDs, git SHAs, or artifact names in notifications/logs

## Search Patterns for Quick Detection (RELEASE-21)

Use these `rg` commands to locate pipeline and release logic quickly.

### Workflow Discovery

```bash
rg -n "name:|on:|jobs:" .github/workflows -g '*.yml'
rg -n "deploy|release|publish|svn|wp.org|artifact|zip" . -g '*.{yml,yaml,sh,js,ts,json,md}'
```

### Secret and Environment Risk

```bash
rg -n "secrets\.|GITHUB_TOKEN|SVN_PASSWORD|SSH_PRIVATE_KEY|rsync|scp|ssh " . -g '*.{yml,yaml,sh,js,ts,md}'
rg -n "environment:|production|staging|preview|workflow_dispatch|tags:" .github/workflows -g '*.yml'
```

### Packaging and Versioning

```bash
rg -n "zip |tar |composer install|npm ci|npm run build|svn cp|svn commit|Stable tag|Version:" . -g '*.{yml,yaml,sh,php,txt,md,json}'
rg -n "readme.txt|plugin.php|style.css|package.json|composer.lock|package-lock.json|pnpm-lock.yaml|yarn.lock" . -g '*'
```

## Reference Files

- `references/github-actions-and-gating.md` - workflow structure, deploy protections, environment boundaries, and action hygiene
- `references/packaging-and-artifacts.md` - plugin/theme artifact design, build outputs, excludes, and verification
- `references/wordpress-org-and-rollbacks.md` - WordPress.org SVN release patterns, stable tag/version sync, rollback thinking, and post-deploy checks

## Output Format (RELEASE-23)

For each finding include:

1. Severity: `CRITICAL`, `WARNING`, or `INFO`
2. File and line number
3. CI/CD or release risk summary
4. Why it matters for shipped artifacts, deploy safety, or operator confidence
5. Recommended safer pattern

If no issues are found, say so clearly and mention any residual gaps such as missing rollback notes, weak artifact inspection, or unclear environment promotion rules.
