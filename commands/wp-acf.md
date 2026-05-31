---
description: Fast WordPress ACF/content-model scan - checks CPT vs taxonomy vs field choices, field-group hygiene, repeater/flexible-content overuse, JSON drift, and obvious meta-query risk
argument-hint: [file-or-directory]
---

Use the **wp-acf-and-content-modeling** skill to run a fast first-pass ACF and content modeling scan.

**Target**: $ARGUMENTS (if empty, use current working directory)

Do a concise audit focused on the highest-risk modeling issues first:
- entity design problems (wrong CPT/taxonomy/field boundary)
- risky repeater or flexible-content usage
- unstable field naming or ACF JSON workflow drift
- obvious `meta_query` / `postmeta` scaling hazards

Return only the most important findings with severity, short explanations, and the clearest next fixes.
