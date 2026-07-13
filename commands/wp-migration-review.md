---
description: WordPress migration and upgrade review - validates versioned upgrades, schema changes, dbDelta usage, backfills, and rollout safety
argument-hint: "[file-or-directory]"
---

Use and follow the **wp-migration-upgrade-review** skill to perform a comprehensive WordPress migration and upgrade review.

**Target**: $ARGUMENTS (if empty, use current working directory)

Execute the full Code Review Workflow from the skill, load reference files as needed for deeper analysis, and format output using the skill's Output Format section with severity levels (Critical/Warning/Info). If plugin architecture issues are found, suggest running `/wp-plugin-review`. If performance or background-processing concerns dominate, suggest running `/wp-perf-review`.

