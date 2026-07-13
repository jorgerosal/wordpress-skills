---
description: WordPress WP-CLI and operations review - validates custom CLI commands, multisite scope, search-replace safety, and automation workflows
argument-hint: "[file-or-directory]"
---

Use and follow the **wp-wpcli-and-ops** skill to perform a comprehensive WordPress operations review.

**Target**: $ARGUMENTS (if empty, use current working directory)

Execute the full Code Review Workflow from the skill, load reference files as needed for deeper analysis, and format output using the skill's Output Format section with severity levels (Critical/Warning/Info). If deployment-time static analysis dominates, suggest `/wp-phpstan-review`. If the work is specifically about reproducible Playground setups, suggest `/wp-playground-review`.
