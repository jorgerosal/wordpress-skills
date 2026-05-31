# GitHub Actions and Deployment Gating Guide

Use this reference when reviewing WordPress CI/CD workflows.

## Core Principles

- The artifact that passed validation should be the artifact that gets deployed.
- Production deploys need explicit branch/tag/environment protections.
- Secrets should exist only in the jobs and environments that actually need them.
- Build, verify, package, and deploy are easier to reason about when separated.

## Workflow Structure Checklist

### Preferred Stages

1. Lint / static analysis
2. Unit/integration tests
3. Build/package artifact
4. Verify artifact contents
5. Deploy/promote artifact
6. Post-deploy verification

This does not need six separate workflows, but it should be clear where each responsibility lives.

## Common Review Findings

### Smell: Deploy on Every Push

```yaml
on:
  push:
    branches: [main]

jobs:
  deploy:
    steps:
      - run: ./deploy.sh
```

Why it is risky:
- weak release control
- easy accidental production changes
- hard to coordinate versioning and rollback

Safer direction:
- gate deploys behind protected tags, environments, or explicit manual approval
- separate CI verification from CD/promote actions

### Smell: Unpinned or Over-Broad Action Usage

```yaml
- uses: actions/checkout@v4
- uses: some-third-party/deploy-action@main
```

Why it is risky:
- upstream changes can alter your pipeline behavior
- sensitive jobs inherit supply-chain risk

Safer direction:
- pin critical third-party actions to immutable SHAs where practical
- minimize third-party action surface on jobs that handle deploy credentials

## Environment Questions

- Does staging use separate credentials and URLs from production?
- Are preview deploys isolated from real user traffic?
- Can a forked PR access any deploy secrets? It should not.
- Do environment rules require approval for production?

## Review Prompts

- If the deploy job reruns tomorrow for the same commit, will it produce the same artifact?
- Can operators tell which git ref, artifact, and environment were involved in a release?
- If tests fail after packaging but before deploy, does the workflow still block promotion?
