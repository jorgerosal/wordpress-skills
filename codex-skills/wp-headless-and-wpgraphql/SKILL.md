---
name: wp-headless-and-wpgraphql
description: Headless WordPress and WPGraphQL review for Codex. Use when reviewing decoupled WordPress frontends, schema extensions, preview/auth flows, and cache or build invalidation around WPGraphQL.
---

# Codex Headless WordPress and WPGraphQL Review

## Purpose

Use this skill when Codex should review a decoupled WordPress stack that exposes content through WPGraphQL and serves it through a separate frontend such as Next.js, Gatsby, Remix, or another JS application.

## Focus Areas

- Schema boundaries and content modeling
- Resolver/query performance and pagination
- Preview, draft, and auth correctness
- Caching, persisted queries, builds, and revalidation

## Workflow

1. Identify WPGraphQL schema extensions, frontend query documents, and preview/build flows.
2. Check data boundaries and unpublished-content exposure first.
3. Review resolver efficiency, pagination, and over-fetching risks.
4. Load only the shared references needed from `../../claude-skills/wp-headless-and-wpgraphql/references/`.
5. Report findings with severity, file references, impact, and safer patterns.

## References

- `../../claude-skills/wp-headless-and-wpgraphql/references/graphql-schema-and-modeling.md`
- `../../claude-skills/wp-headless-and-wpgraphql/references/auth-preview-and-drafts.md`
- `../../claude-skills/wp-headless-and-wpgraphql/references/caching-builds-and-webhooks.md`
