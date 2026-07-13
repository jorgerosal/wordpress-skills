---
description: Quick WordPress ops scan - fast pattern detection for WP-CLI commands, multisite scope, search-replace risk, and maintenance scripts
argument-hint: "[path]"
---

Use the **wp-wpcli-and-ops** skill to perform a quick WordPress ops check.

**Target**: $ARGUMENTS (if empty, use current working directory)

Focus only on the "Search Patterns for Quick Detection" section -- run the scan commands to find WP-CLI and operational issues fast. Report matches with file:line references and severity levels. Skip deep analysis.

If critical issues are found, suggest running `/wp-ops-review` for comprehensive operational review with safer alternatives.
