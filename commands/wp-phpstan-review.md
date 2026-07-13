---
description: WordPress PHPStan review - validates phpstan config, baseline discipline, CI wiring, and WordPress-specific static-analysis setup
argument-hint: "[file-or-directory]"
---

Use and follow the **wp-phpstan-review** skill to perform a comprehensive WordPress PHPStan review.

**Target**: $ARGUMENTS (if empty, use current working directory)

Execute the full Code Review Workflow from the skill, load reference files as needed for deeper analysis, and format output using the skill's Output Format section with severity levels (Critical/Warning/Info). If broader testing strategy dominates, suggest `/wp-test-review`. If operational WP-CLI workflows dominate, suggest `/wp-ops-review`.
