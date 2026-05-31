---
description: Quick WordPress release scan - fast pattern detection for GitHub Actions, deploy scripts, packaging steps, and release/rollback risk
argument-hint: [path]
---

Use the **wp-ci-cd-and-release-engineering** skill to perform a quick WordPress release check.

**Target**: $ARGUMENTS (if empty, use current working directory)

Focus only on the "Search Patterns for Quick Detection" section -- run the scan commands to find pipeline, artifact, secret, and deploy-risk patterns fast. Report matches with file:line references and severity levels. Skip deep analysis.

If critical issues are found, suggest running `/wp-release-review` for comprehensive CI/CD and release engineering review with safer alternatives.
