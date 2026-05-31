---
name: wp-acf-and-content-modeling
description: WordPress ACF and content modeling review for Codex. Use when reviewing ACF field groups, CPT and taxonomy design, options pages, repeaters, flexible content, relationship fields, ACF JSON sync, and meta-heavy content architecture.
---

# Codex WordPress ACF and Content Modeling Review

## Purpose

Use this skill when Codex needs to review whether a WordPress project modeled its content well, not just whether the templates currently render.

## Focus Areas

- CPT, taxonomy, and field-boundary decisions
- ACF field groups, naming, defaults, and conditional logic
- Repeater and flexible-content fit
- Relationship fields and return-format consistency
- Options pages and global settings design
- ACF JSON sync and environment drift
- Meta-query and storage-performance implications

## Workflow

1. Inventory the real entities, taxonomies, options pages, and field groups.
2. Check whether the model uses the right boundary: CPT vs taxonomy vs field.
3. Review ACF field-group structure, naming, and editor ergonomics.
4. Flag repeaters, flexible content, and relationship fields used beyond their safe role.
5. Escalate query/storage risks when the model pushes too much onto `postmeta`.
6. Report findings with severity, file references, subsystem notes, and suggested redesigns.

## Reference Files

Load only the references you need from:

- `../../claude-skills/wp-acf-and-content-modeling/references/content-modeling-guide.md`
- `../../claude-skills/wp-acf-and-content-modeling/references/acf-json-and-field-group-guide.md`
- `../../claude-skills/wp-acf-and-content-modeling/references/meta-query-and-performance.md`

## Output

- Group findings by severity
- Distinguish schema blockers from editorial-quality improvements
- Call out taxonomy-vs-meta and entity-vs-field decisions explicitly
- Suggest follow-up in performance, REST, or block-review domains where relevant
