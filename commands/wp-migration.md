---
description: Quick WordPress migration scan - fast pattern detection for version guards, schema changes, dbDelta use, and risky backfills
argument-hint: "[path]"
---

Use the **wp-migration-upgrade-review** skill to perform a quick migration check.

**Target**: $ARGUMENTS (if empty, use current working directory)

Focus only on the "Search Patterns for Quick Detection" section -- run the scan commands to find migration and upgrade issues fast. Report matches with file:line references and severity levels. Skip deep analysis.

If critical issues are found, suggest running `/wp-migration-review` for comprehensive upgrade review with fix recommendations.

