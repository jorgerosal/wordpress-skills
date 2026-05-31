# GraphQL Schema and Content Modeling Guide

Use this reference when reviewing WordPress content models exposed through WPGraphQL.

## Core Principles

- Expose durable editorial concepts, not accidental storage details.
- Prefer schema shapes that stay stable even if the backend implementation changes.
- Model one-to-many relationships as connections when pagination matters.
- Avoid teaching the frontend to reconstruct the domain by stitching unrelated scalar fields.

## Content-Boundary Checklist

### Post Types, Taxonomies, and Options

- A CPT should represent a distinct content object with its own lifecycle.
- A taxonomy should represent a reusable classification or filter axis.
- Options/settings should not be exposed as if they were per-node content.
- If the frontend needs heavily structured landing-page data, check whether the backend has a real model for it or whether ACF/flexible content is being used as an application layer.

### Field-Registration Questions

- Does this field belong on the node being extended?
- Should the field be a scalar, object, list, or connection?
- Is the field nullable for a good reason, or is null masking schema drift?
- Does the field force extra queries for every edge in a connection?

## Common Review Findings

### Smell: Meta-as-API

```php
register_graphql_field( 'Post', 'heroImageUrl', [
  'type' => 'String',
  'resolve' => static function( $post ) {
    return get_post_meta( $post->ID, 'hero_image_url', true );
  },
] );
```

Why it is risky:
- couples the frontend to raw storage keys
- encourages one-off field sprawl
- hides whether the value belongs in media, options, or a richer object type

Safer direction:
- expose a named object or reuse an existing media relationship
- keep field names domain-oriented rather than storage-oriented

### Smell: Unbounded Connections

```php
register_graphql_connection( [
  'fromType' => 'RootQuery',
  'toType'   => 'Article',
  'fromFieldName' => 'allArticles',
  'resolve'  => static function() {
    return new WP_Query( [
      'post_type'      => 'article',
      'posts_per_page' => -1,
    ] );
  },
] );
```

Why it is risky:
- easy to DOS accidentally from the frontend
- hard to cache deterministically
- creates production-only performance failures

Safer direction:
- require pagination
- use explicit filtering/sorting arguments
- review how the frontend consumes the connection before widening limits

## Resolver Design Guidance

- Avoid `get_post_meta()` inside hot loops unless the data is preloaded or cached intentionally.
- Prefer connections over custom array assembly when pagination, cursors, or consistent shape matters.
- Keep resolver logic thin; push domain decisions into shared model helpers when multiple fields need the same data.
- When exposing ACF-backed data, decide whether the frontend should read the raw field output or a normalized shape.

## Frontend Coupling Checks

Watch for frontend code that:
- hardcodes field names from temporary experiments
- duplicates fragments for the same content type in multiple routes
- assumes a field exists on every template even when the CMS model does not guarantee it
- treats nullable data as a control-flow mechanism instead of modeling variants explicitly

## Review Prompts

- If this content model changes, does the GraphQL contract still make sense?
- Would a new frontend route be able to reuse this schema cleanly?
- Is the schema helping the frontend ask smaller questions, or forcing broad fetches followed by client-side filtering?
