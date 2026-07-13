---
description: WordPress ACF and content modeling review - validates field-group architecture, CPT and taxonomy decisions, repeater/flexible-content fit, ACF JSON sync, and meta-query risks
argument-hint: "[file-or-directory]"
---

Use and follow the **wp-acf-and-content-modeling** skill to perform a comprehensive WordPress ACF and content modeling review.

**Target**: $ARGUMENTS (if empty, use current working directory)

Execute the full review workflow from the skill, load reference files as needed, and format output using the skill's Output Format section with severity levels (Critical/Warning/Info). Explicitly call out CPT-vs-taxonomy-vs-field decisions, ACF JSON drift, and performance risks when the model leans too hard on `postmeta`. If query cost is a major issue, suggest running `/wp-perf-review` for deeper performance analysis.
