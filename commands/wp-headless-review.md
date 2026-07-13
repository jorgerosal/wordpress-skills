---
description: Headless WordPress and WPGraphQL review - validates schema design, resolver safety, preview/auth flows, and cache/build invalidation
argument-hint: "[file-or-directory]"
---

Use and follow the **wp-headless-and-wpgraphql** skill to perform a comprehensive headless WordPress review.

**Target**: $ARGUMENTS (if empty, use current working directory)

Execute the full Code Review Workflow from the skill, load reference files as needed for deeper analysis, and format output using the skill's Output Format section with severity levels (Critical/Warning/Info). If the project is REST-first with little or no GraphQL surface, suggest `/wp-rest-review`. If content-model design dominates the problem more than frontend/API architecture, suggest `/wp-acf-review`.
