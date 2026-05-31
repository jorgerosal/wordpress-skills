# Auth, Preview, and Draft Content Guide

Use this reference when reviewing how a headless WordPress stack handles unpublished content, preview mode, and authenticated API access.

## Core Rule

Preview and draft access must be explicit about *who* is requesting the content, *which* content they can preview, and *which caches must be bypassed*.

## Review Checklist

### Preview Endpoints

Check whether preview or draft-mode handlers:
- validate a secret or signed token
- verify the requested content actually matches the token context
- redirect only to known-safe frontend destinations
- avoid exposing enough information for unauthenticated enumeration

### GraphQL Access Boundaries

Check whether custom resolvers or schema extensions:
- return private or draft content without capability-aware guards
- expose internal notes, secrets, or admin-only metadata by accident
- depend on frontend hiding rather than backend authorization

### Cache Bypass Rules

Preview traffic should not share the same caching path as public traffic.

Red flags:
- preview routes cached at CDN or reverse-proxy layer
- draft-mode cookies ignored by the data-fetching layer
- persisted queries reused for draft and public traffic without cache partitioning
- revalidation hooks publishing pages that still depend on stale draft data

## Common Review Findings

### Smell: Preview by Slug Only

```ts
export async function GET(req: Request) {
  const slug = new URL(req.url).searchParams.get('slug');
  return Response.redirect(`/posts/${slug}`);
}
```

Why it is risky:
- no token validation
- no linkage to a specific post revision or editor session
- easy to probe or abuse

Safer direction:
- require a signed secret
- resolve the canonical content ID server-side
- enter preview mode only after validation succeeds

### Smell: Frontend Assumes Backend Has Already Authorized

```ts
const data = await client.request(PostPreviewQuery, { id });
```

Why it is risky:
- the frontend may request preview-only fields from the public API path
- authorization becomes implicit and hard to reason about

Safer direction:
- separate preview client configuration from public client configuration
- make credentials/tokens explicit in preview flows
- verify resolver behavior for draft/private content directly

## Token and Secret Guidance

- Use signed, environment-specific secrets for preview or webhook triggers.
- Prefer short-lived or one-purpose tokens over broad shared keys.
- Do not log secrets, preview URLs with secrets, or raw authorization headers.
- Document rotation and failure behavior so editors are not blocked by stale tokens.

## Draft and Revision Questions

- Can editors preview unpublished changes without publishing them accidentally?
- Do revisions map to stable frontend routes?
- Can the frontend distinguish missing content from unauthorized content?
- Are private posts, password-protected posts, or embargoed content treated intentionally?

## Operational Follow-Up

If preview/auth logic is present but under-documented, recommend:
- a short flow diagram for editor preview
- explicit cache-bypass notes
- a list of secrets/tokens involved and where they are configured
- a smoke test for draft content access and public denial paths
