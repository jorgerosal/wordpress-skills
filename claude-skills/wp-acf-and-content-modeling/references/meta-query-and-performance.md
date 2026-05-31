# Meta Query and Performance Guide

Use this reference when ACF-driven data shapes start affecting runtime cost.

## Core idea

ACF makes metadata easy to create, but `postmeta` is not a free analytics database or relational engine.

## High-risk patterns

### 1. Archive or search pages built on stacked `meta_query` clauses
Example smell:
- filter by location
- filter by price band
- filter by event date
- filter by audience
- sort by another meta field

This often means the site is leaning on `postmeta` for primary discovery behavior.

### 2. Querying repeater or flexible-content internals
Smells:
- `LIKE` comparisons on serialized values
- wildcard meta keys for repeater rows in business-critical queries
- reporting screens derived from nested flexible-content data

### 3. Inconsistent storage formats
Smells:
- dates stored as different formats across environments
- numbers stored as formatted strings with commas/currency
- booleans stored inconsistently

These problems make filtering and sorting unreliable.

## Prefer these alternatives when scale matters

- taxonomies for shared filters/facets
- dedicated lookup tables for high-volume structured data
- derived/indexed fields for common queries
- scheduled denormalization for expensive aggregates
- object caching or transient caching for expensive assembled views

## Review heuristics

### CRITICAL
- revenue-critical or navigation-critical pages depend on heavy meta queries at scale
- flexible content or repeater data is queried as though it were relational tables
- date/number comparison logic is semantically wrong because values are stored as strings

### WARNING
- repeated `get_field()` calls inside loops without normalization
- complex page builds recompute derived content from nested ACF structures every request
- relationship fields trigger avoidable N+1 lookups
- a CPT exists mostly to enable querying, but the real query keys remain buried in meta

### INFO
- small/medium sites may tolerate meta queries today, but the model may still be strategically weak
- precomputing a few derived fields can avoid bigger rewrites later

## Quick review questions

1. Which pages depend on filtering or sorting by ACF values?
2. How many posts participate in those queries?
3. Are the query keys scalar and consistently formatted?
4. Would a taxonomy or lookup table fit better?
5. Can results be cached or denormalized safely?
