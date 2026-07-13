---
description: Quick WordPress admin UI scan - fast pattern detection for admin menus, settings pages, notices, and screen-specific asset loading
argument-hint: "[path]"
---

Use the **wp-admin-ui-development** skill to perform a quick admin UI check.

**Target**: $ARGUMENTS (if empty, use current working directory)

Focus only on the "Search Patterns for Quick Detection" section -- run the scan commands to find admin UI issues fast. Report matches with file:line references and severity levels. Skip deep analysis.

If critical issues are found, suggest running `/wp-admin-review` for comprehensive admin UI review with fix recommendations.

