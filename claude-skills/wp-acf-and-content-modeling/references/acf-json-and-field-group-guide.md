# ACF JSON and Field Group Guide

Use this reference when reviewing how teams manage field definitions across environments.

## Core rule

Treat field definitions as code, not as production-only admin state.

## Healthy workflow

- field groups are edited locally or in a safe dev environment
- Local JSON is enabled
- generated JSON files are committed to git
- changes move through normal review and deployment
- database-only changes are temporary and later exported

## Red flags

### CRITICAL
- field groups only exist in the database
- production is the source of truth
- field keys are copied into code without stable field names backing them
- multiple environments carry silent schema drift

### WARNING
- `acf-json` is committed inconsistently
- some field groups are JSON-backed and others are not
- contributors are unclear whether to sync from DB to JSON or JSON to DB
- field-group edits happen in production without a documented promotion path

## What to inspect

- is an `acf-json/` folder present?
- is it ignored accidentally in `.gitignore`?
- do field-group JSON files change when expected?
- are developers using `acf/settings/save_json` or custom paths?
- do commits show meaningful field-group diffs over time?

## Review questions

1. Can a fresh environment recreate the schema from the repo?
2. Are field names stable even if field keys regenerate?
3. Is there a plan for renamed/removed fields?
4. Are block field groups, options pages, and clone fields all covered by the same sync discipline?

## Good practices

- keep ACF JSON in version control
- document custom JSON load/save paths
- prefer stable field names with domain prefixes
- export major field-group refactors in the same PR as template/code changes
- review JSON diffs alongside PHP/JS/template changes

## Bad practices

- “It works on staging because the fields already exist there”
- “We’ll sync the JSON later”
- “We renamed the field in ACF and assumed nothing else depends on it”
- “We copied a field group and only changed labels, not names, keys, or intent”

## Field group organization tips

- split giant groups by editorial task or component area
- use tabs, instructions, defaults, and conditional logic to reduce editor error
- avoid duplicate field groups with minor differences unless clone fields or composition can simplify them
- make location rules reflect content boundaries clearly
