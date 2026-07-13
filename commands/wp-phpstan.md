---
description: Quick WordPress PHPStan scan - fast pattern detection for phpstan config, baselines, WordPress stubs, and CI analysis issues
argument-hint: "[path]"
---

Use the **wp-phpstan-review** skill to perform a quick WordPress PHPStan check.

**Target**: $ARGUMENTS (if empty, use current working directory)

Focus only on the "Search Patterns for Quick Detection" section -- run the scan commands to find PHPStan issues fast. Report matches with file:line references and severity levels. Skip deep analysis.

If critical issues are found, suggest running `/wp-phpstan-review` for comprehensive static-analysis review with configuration and rollout guidance.
