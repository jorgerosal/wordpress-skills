---
description: WordPress test strategy review - recommends appropriate unit, integration, and E2E coverage across plugins, themes, blocks, REST APIs, and WooCommerce code
argument-hint: "[file-or-directory]"
---

Use and follow the **wp-test-strategy** skill to perform a comprehensive WordPress test strategy review.

**Target**: $ARGUMENTS (if empty, use current working directory)

Execute the full Code Review Workflow from the skill, load reference files as needed for deeper analysis, and format output using the skill's Output Format section with prioritized testing recommendations. If security-sensitive flows lack coverage, suggest running `/wp-sec-review`. If migration or WooCommerce risk dominates, point to the relevant specialty review as needed.

