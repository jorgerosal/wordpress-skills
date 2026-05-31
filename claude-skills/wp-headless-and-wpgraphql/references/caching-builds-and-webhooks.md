# Caching, Builds, and Webhooks Guide

Use this reference when reviewing how a headless WordPress project turns CMS changes into frontend updates.

## Caching Layers to Distinguish

1. WordPress/application cache
2. GraphQL/API cache
3. Frontend framework cache
4. CDN / edge cache
5. Static build artifacts

A reliable review names which layer is responsible for freshness and which event invalidates it.

## Build and Revalidation Checklist

### Route Freshness

- Does every content change cause a full rebuild, or can the app revalidate only affected routes?
- Are taxonomy archives, listing pages, and navigation structures considered when a single post changes?
- Is homepage or landing-page content tied to options/global settings changes?

### Webhook Design

- Verify webhook signatures or secrets before processing.
- Include enough payload context to determine affected content and routes.
- Make delivery idempotent when possible.
- Add retry or replay support for failed downstream invalidation.

### Persisted Queries

Persisted queries help when:
- the frontend repeatedly issues a stable set of known queries
- CDN caching should key on query hashes rather than full bodies
- you want to block arbitrary query shapes in production

Persisted queries do **not** fix:
- poor schema design
- expensive resolvers
- missing pagination
- preview cache separation

## Common Review Findings

### Smell: Full Rebuild on Every Update

```yaml
on_wordpress_publish:
  - curl -X POST https://frontend.example.com/api/rebuild
```

Why it is risky:
- scales poorly with editorial activity
- delays content freshness
- obscures which content or route actually changed

Safer direction:
- route-specific revalidation when framework support exists
- webhook payloads that identify post ID, type, slug, and taxonomy impact
- observability showing which pages were revalidated

### Smell: Cache Invalidation Without Verification

```ts
await fetch('/api/revalidate', { method: 'POST', body: JSON.stringify(payload) });
```

Why it is risky:
- failures may be silent
- content appears stale with no operator trail
- repeated delivery may create race conditions

Safer direction:
- log accepted/rejected webhook events
- return structured success/failure responses
- store event IDs or timestamps for replay/debugging

## Headless Performance Notes

- Large GraphQL responses often indicate either over-fetching or poor route segmentation.
- If the frontend uses `no-store` everywhere to avoid staleness, treat that as a design smell, not a cache strategy.
- If route revalidation depends on slug-only assumptions, check rename and taxonomy-change behavior.

## Review Prompts

- If a post slug changes, what gets invalidated?
- If a taxonomy term changes, what listing or archive pages rebuild?
- If a global option changes, what pages depend on it?
- Can operators tell whether stale content is coming from WordPress, GraphQL, the frontend app, or the CDN?
