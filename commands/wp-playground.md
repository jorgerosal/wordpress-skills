---
description: Quick WordPress Playground scan - fast pattern detection for Blueprints, Playground CLI setup, embeds, and zero-setup repro issues
argument-hint: "[path]"
---

Use the **wp-playground-development** skill to perform a quick WordPress Playground check.

**Target**: $ARGUMENTS (if empty, use current working directory)

Focus only on the "Search Patterns for Quick Detection" section -- run the scan commands to find Playground-related issues fast. Report matches with file:line references and severity levels. Skip deep analysis.

If critical issues are found, suggest running `/wp-playground-review` for comprehensive Playground review with reproducibility guidance.
