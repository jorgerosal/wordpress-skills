# WordPress.org Release and Rollback Guide

Use this reference when reviewing WordPress plugin/theme release workflows, especially when WordPress.org SVN is involved.

## WordPress.org-Specific Risks

### Stable Tag and Version Drift

Common failure mode:
- plugin header version says one thing
- `readme.txt` stable tag says another
- SVN tag pushed does not match either

Review whether the workflow validates all three before publish.

## SVN Deployment Checklist

- Is trunk/tag copy direction explicit?
- Are deploy credentials scoped only to release jobs?
- Does the workflow validate the version/tag before `svn commit`?
- Can operators dry-run or at least inspect the staged SVN tree before publish?

## Rollback Expectations

A rollback plan should answer:
- what exact artifact/version is currently live
- how to revert to the previous known-good release
- how to communicate a bad release internally
- how to verify recovery after rollback

## Common Review Findings

### Smell: Tagging Without Preflight Validation

```bash
svn cp trunk tags/$VERSION
svn commit -m "Release $VERSION"
```

Why it is risky:
- version metadata may be inconsistent
- wrong artifact may be tagged
- rollback becomes guesswork

Safer direction:
- validate version sources before tagging
- stage and inspect the SVN tree first
- emit release logs with version, tag, and commit SHA

### Smell: No Post-Deploy Verification

Why it is risky:
- deploy may succeed technically while shipping broken assets or bad metadata
- failures surface only after users report them

Safer direction:
- add smoke checks after deploy or publish
- verify install/update path with a clean environment when possible

## Review Prompts

- If a release fails halfway through, what state is the user-facing system left in?
- Can the prior artifact be redeployed quickly?
- Does the team know where release credentials live and how they are rotated?
- Are changelog or release notes tied to the actual shipped artifact/version?
