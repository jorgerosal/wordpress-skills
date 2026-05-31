# Content Modeling Guide

Use this reference when the main question is whether the WordPress project chose the right entity boundaries before it chose the right field types.

## First questions to answer

1. What are the real business entities?
   - posts/articles
   - locations
   - staff
   - case studies
   - events
   - products
   - reusable page sections
   - site-wide settings

2. Which concepts need their own lifecycle?
   Give something its own content type when it needs one or more of:
   - its own permalink or canonical URL
   - independent publishing workflow
   - reuse across multiple pages
   - independent ownership/editors
   - archive/filter/search views
   - API exposure as a first-class object

3. Which concepts are just attributes?
   Keep data as fields when it is truly attached to a single parent object and does not need standalone lifecycle behavior.

## CPT vs taxonomy vs field

### Use a CPT when
- the thing is a first-class object
- it may need archives or single pages
- it has many attributes of its own
- it may be related to multiple other objects
- editors think of it as “a thing we create and manage”

Examples:
- Team members
- Locations
- Events
- Recipes
- Testimonials reused across many pages

### Use a taxonomy when
- the goal is classification, grouping, filtering, or faceting
- multiple content items can share the same value
- consistency matters more than free-form input
- you need browsable archive pages or filter UI

Examples:
- Topic
- Location region
- Audience segment
- Service category

### Use a field when
- the value belongs to exactly one object
- it is not reused elsewhere
- it does not need its own archive or filter ecosystem
- the value is naturally scalar or tightly scoped

Examples:
- Hero eyebrow text
- Event registration URL
- Staff headshot
- External CTA label

## Smells that the model is wrong

### Too much in one CPT
- one post type covers several unrelated concepts
- templates branch heavily on a `type` or `layout` meta field
- editors need long instructions to explain what belongs in a given entry

### Too much in fields
- important categories are entered as free text
- related items are stored as comma-separated strings
- template logic spends lots of effort converting text into structure

### Too much in flexible content
- every page is a bespoke stack of many near-duplicate layouts
- the site has no design-system boundaries
- content becomes impossible to query or reuse
- migrations would require layout-by-layout cleanup

## ACF-specific modeling advice

### Repeater fields
Good for:
- short structured lists tied to one parent record
- rows that do not need independent lifecycle

Bad for:
- entities that need URLs, search, ownership, or reuse
- large datasets later mined through `LIKE` queries

### Flexible content
Good for:
- bounded page-building with well-designed layouts
- editorial composition with clear rules

Bad for:
- unlimited page-builder freedom without governance
- modeling domain objects that should really be entities

### Relationship / post object fields
Good for:
- explicit relations between existing entities
- curated related content blocks

Watch for:
- inconsistent return formats
- unbounded selection UIs
- accidental N+1 field access in templates

### Options pages
Good for:
- truly global settings or shared site-wide content

Bad for:
- data that varies by page, user, locale, or campaign but was centralized out of convenience

## Migration thinking

When the model changes, ask:
- can old content still render?
- do field names remain stable?
- is there a backfill plan?
- does API output change?
- can editors understand what changed?

If the answer is “we’ll just rename the field and update templates,” treat that as risky.
