---
description: Quick WordPress test strategy scan - fast coverage discovery for tests, risky surfaces, and likely test gaps
argument-hint: "[path]"
---

Use the **wp-test-strategy** skill to perform a quick testing-strategy check.

**Target**: $ARGUMENTS (if empty, use current working directory)

Focus only on the "Search Patterns for Quick Detection" section -- run the scan commands to discover existing tests and likely missing coverage areas. Report matches with file:line references and prioritized recommendations. Skip deep analysis.

If important gaps are found, suggest running `/wp-test-review` for a comprehensive test strategy review.

