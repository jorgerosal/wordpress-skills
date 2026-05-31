---
description: WordPress CI/CD and release engineering review - validates pipeline safety, artifact correctness, deploy gating, and rollback readiness
argument-hint: [file-or-directory]
---

Use and follow the **wp-ci-cd-and-release-engineering** skill to perform a comprehensive WordPress delivery-pipeline review.

**Target**: $ARGUMENTS (if empty, use current working directory)

Execute the full Code Review Workflow from the skill, load reference files as needed for deeper analysis, and format output using the skill's Output Format section with severity levels (Critical/Warning/Info). If the project is mostly about WP-CLI maintenance rather than delivery pipelines, suggest `/wp-ops-review`. If static analysis configuration dominates the request, suggest `/wp-phpstan-review`.
