# WordPress Skills for Claude and Codex

<p align="center">
  <img src="public/Claude%20Skills%20for%20Wordpress.jpg" alt="WordPress Skills for Claude and Codex" width="100%" />
</p>

<p align="center">
  <a href="https://claude.ai/code">
    <img src="https://img.shields.io/badge/Claude%20Code-Ready-1f6feb?style=for-the-badge" alt="Claude Code Ready" />
  </a>
  <img src="https://img.shields.io/badge/Codex-Parallel%20skills-0a7ea4?style=for-the-badge" alt="Codex parallel skills" />
  <img src="https://img.shields.io/badge/WordPress-15%20review%20domains-21759b?style=for-the-badge&logo=wordpress&logoColor=white" alt="WordPress review domains" />
  <img src="https://img.shields.io/badge/Commands-30%20slash%20commands-2da44e?style=for-the-badge" alt="30 slash commands" />
  <img src="https://img.shields.io/badge/Focus-Code%20review%20and%20triage-8250df?style=for-the-badge" alt="Code review and triage" />
</p>

Professional WordPress skills for [Claude Code](https://claude.ai/code) and Codex, built for code review, fast triage, and modern WordPress development workflows across performance, security, plugins, ACF/content modeling, blocks, themes, WooCommerce, REST APIs, admin UI, migrations, accessibility, testing, WP-CLI operations, Playground, and PHPStan.

## Why This Pack

- Structured review workflows for real WordPress codebases
- Quick triage commands for fast audits before deeper review
- Specialized guidance for Gutenberg, block themes, and WooCommerce
- Cross-skill handoffs when a finding belongs in another domain
- Line-numbered, severity-based review output with fix guidance
- Parallel skill wrappers for both Claude and Codex

## Repository Layout

```text
claude-skills/   # Claude-oriented skill pack with shared reference docs
codex-skills/    # Codex-oriented skill wrappers for the same fourteen domains
commands/        # Claude slash commands
public/          # README assets
docs/            # GitHub Pages single-page site
```

The Codex skills reuse the domain references stored under `claude-skills/` so the review heuristics stay aligned without duplicating the whole reference library.

The project also includes a deployable GitHub Pages site in `docs/`.

## Validation

Run the repository validator before opening a PR or after adding skills, commands, or docs:

```bash
python3 scripts/validate_repo.py
```

## Available Skills

`✅` Available now · `🚧` In progress

| Skill | Focus | Status |
|-------|-------|--------|
| **wp-performance-review** | Performance bottlenecks, query patterns, caching, cron, asset loading | ✅ |
| **wp-security-review** | XSS, SQL injection, CSRF, auth checks, file upload risks | ✅ |
| **wp-plugin-development** | Plugin structure, lifecycle hooks, Settings API, i18n, WordPress.org standards | ✅ |
| **wp-acf-and-content-modeling** | ACF field groups, CPT/taxonomy design, repeaters, flexible content, JSON sync, and meta-query risk | ✅ |
| **wp-block-development** | `block.json`, React/JSX editor patterns, render callbacks, Interactivity API | ✅ |
| **wp-theme-development** | `theme.json`, templates, template parts, style variations, FSE patterns | ✅ |
| **wp-woocommerce-dev** | HPOS, CRUD APIs, payment gateway patterns, cart fragments, template overrides | ✅ |
| **wp-rest-api-development** | Custom REST routes, permission callbacks, schema design, request validation, response shape | ✅ |
| **wp-admin-ui-development** | Settings pages, admin menus, notices, screen targeting, admin form flows | ✅ |
| **wp-migration-upgrade-review** | Versioned upgrades, `dbDelta()`, backfills, rollout safety, schema changes | ✅ |
| **wp-accessibility-review** | Semantic markup, keyboard access, focus behavior, labels, ARIA, accessible interactions | ✅ |
| **wp-test-strategy** | Unit vs integration vs E2E coverage, test planning, regression risk, WordPress test gaps | ✅ |
| **wp-wpcli-and-ops** | WP-CLI workflows, multisite operations, search-replace safety, automation, and deployment checks | 🚧 |
| **wp-playground-development** | WordPress Playground blueprints, reproducible demos, zero-setup bug repros, and embed patterns | 🚧 |
| **wp-phpstan-review** | PHPStan for WordPress projects, baseline strategy, CI integration, and practical static-analysis review | 🚧 |

## Installation

Choose the install path for the agent you want to use.

### Claude Code

#### Which Option Should You Use?

- **Use Option 1** if you want the skills available inside one project for yourself or your team
- **Use Option 2** if you want the skills available across your machine
- **Use Option 3** if you only want one Claude skill and are fine updating it manually

#### Option 1: Add to Your Project (Recommended)

Best for shared projects, client work, and teams.

```bash
# In your project root
git submodule add https://github.com/jorgerosal/wordpress-skills.git .claude/plugins/wordpress
git commit -m "Add WordPress Claude skills"
```

To update later:

```bash
git submodule update --remote .claude/plugins/wordpress
git add .claude/plugins/wordpress
git commit -m "Update WordPress Claude skills"
```

#### Option 2: Install for Your User Account

Best for solo usage across multiple projects.

```bash
git clone https://github.com/jorgerosal/wordpress-skills.git ~/.claude/plugins/wordpress
```

To update later:

```bash
cd ~/.claude/plugins/wordpress
git pull
```

#### Option 3: Install One Skill Manually

Best if you only want a single skill and do not need the full pack.

```bash
# Copy just the performance review skill
cp -r claude-skills/wp-performance-review ~/.claude/skills/
```

If you use this option, updates are manual. Re-copy the skill when the source changes.

#### Verify the Claude Install

After installing:

1. Restart Claude Code if needed
2. Open a WordPress project
3. Run a command such as:

```bash
/wp-perf-review
```

### Codex

Install the parallel Codex wrappers if you want the same WordPress domains available as Codex skills.

#### Option 1: Install All Codex Skills

```bash
mkdir -p ~/.codex/skills
cp -r codex-skills/* ~/.codex/skills/
cp -r claude-skills ~/.codex/claude-skills
```

#### Option 2: Install One Codex Skill

```bash
mkdir -p ~/.codex/skills
cp -r codex-skills/wp-performance-review ~/.codex/skills/
mkdir -p ~/.codex/claude-skills/wp-performance-review
cp -r claude-skills/wp-performance-review/references ~/.codex/claude-skills/wp-performance-review/
```

If your Codex setup uses a custom `CODEX_HOME`, copy the wrappers into `$CODEX_HOME/skills/` and the shared reference tree into `$CODEX_HOME/claude-skills/`.

#### Verify the Codex Install

Open a WordPress project in Codex and invoke the skill naturally, for example:

```text
Review this plugin for performance issues
```

## Slash Commands

Claude skills include a full review command and a faster triage command.

| Command | Use Case |
|---------|----------|
| `/wp-perf-review [path]` | Full performance review with grouped findings and fix guidance |
| `/wp-perf [path]` | Fast performance scan for critical patterns |
| `/wp-sec-review [path]` | Full security review for exploitable patterns |
| `/wp-sec [path]` | Fast security scan for common high-risk issues |
| `/wp-plugin-review [path]` | Full plugin architecture and standards review |
| `/wp-plugin [path]` | Fast plugin structure and standards scan |
| `/wp-acf-review [path]` | Full ACF and content-modeling review for CPTs, taxonomies, field groups, JSON sync, and meta-query risk |
| `/wp-acf [path]` | Fast ACF/content-model scan for schema and field-group issues |
| `/wp-block-review [path]` | Full Gutenberg block review across PHP and JS/JSX |
| `/wp-block [path]` | Fast block API and `block.json` scan |
| `/wp-theme-review [path]` | Full block or classic theme review |
| `/wp-theme [path]` | Fast theme structure and FSE scan |
| `/wp-woo-review [path]` | Full WooCommerce extension review |
| `/wp-woo [path]` | Fast WooCommerce compatibility and risk scan |
| `/wp-rest-review [path]` | Full REST API review for routes, auth, validation, and response design |
| `/wp-rest [path]` | Fast REST API scan for route and permission issues |
| `/wp-admin-review [path]` | Full admin UI review for settings screens, menus, notices, and admin UX |
| `/wp-admin [path]` | Fast admin UI scan for menus, settings flow, and admin asset loading |
| `/wp-migration-review [path]` | Full migration and upgrade review for versioned updates, schema changes, and backfills |
| `/wp-migration [path]` | Fast migration scan for risky upgrade patterns |
| `/wp-a11y-review [path]` | Full accessibility review for themes, blocks, plugins, and admin interfaces |
| `/wp-a11y [path]` | Fast accessibility scan for semantic, keyboard, focus, and ARIA issues |
| `/wp-test-review [path]` | Full test strategy review with prioritized unit, integration, and E2E recommendations |
| `/wp-test [path]` | Fast testing scan for existing coverage and likely test gaps |
| `/wp-ops-review [path]` | Full WP-CLI and operations review for custom commands, multisite scope, and maintenance workflows |
| `/wp-ops [path]` | Fast WP-CLI and operational risk scan |
| `/wp-playground-review [path]` | Full Playground review for Blueprints, repro environments, and embed flows |
| `/wp-playground [path]` | Fast Playground scan for Blueprint and repro issues |
| `/wp-phpstan-review [path]` | Full PHPStan review for config, baselines, CI wiring, and WordPress-specific analysis setup |
| `/wp-phpstan [path]` | Fast PHPStan scan for config and static-analysis issues |

### Quick Examples

```bash
# Review the current project for performance issues
/wp-perf-review

# Run a fast security scan on a plugin
/wp-sec wp-content/plugins/my-plugin

# Review ACF field groups and content architecture
/wp-acf-review wp-content/themes/my-theme

# Review a custom block package
/wp-block-review wp-content/plugins/my-blocks

# Review a block theme
/wp-theme-review wp-content/themes/my-theme

# Check a WooCommerce extension before release
/wp-woo-review wp-content/plugins/my-woo-extension

# Review custom REST API endpoints
/wp-rest-review wp-content/plugins/my-api-plugin

# Plan tests for a risky plugin change
/wp-test-review wp-content/plugins/my-plugin

# Review custom WP-CLI operations and runbooks
/wp-ops-review wp-content/plugins/my-plugin

# Review a WordPress Playground Blueprint or demo setup
/wp-playground-review docs/playground

# Review PHPStan setup for a plugin or theme
/wp-phpstan-review .
```

When installed from the marketplace, commands are namespaced:

```bash
/wordpress-skills:wp-perf-review [path]
/wordpress-skills:wp-perf [path]
```

## Natural Language Usage

You can also invoke the skills without slash commands or explicit command files. Ask naturally, for example:

```text
Review this plugin for performance issues
Audit this theme for security problems
Help me debug this block.json setup
Check this WooCommerce extension for HPOS issues
Review this theme before launch
Find slow queries in this plugin
Review these custom REST routes
Check this plugin settings page
Audit this release migration before deploy
Review this WP-CLI command for operational risk
Check this Blueprint for a reliable Playground repro
Audit this phpstan.neon for WordPress plugin analysis
Review this theme for accessibility issues
What tests should I add for this change?
```

Claude or Codex will match the request to the most relevant skill and follow that review workflow.

### Trigger Phrases

| Skill | Common Triggers |
|-------|------------------|
| `wp-performance-review` | "performance review", "slow WordPress", "slow queries", "high-traffic", "timeout", "out of memory" |
| `wp-security-review` | "security audit", "XSS", "SQL injection", "CSRF", "nonce verification", "capability check" |
| `wp-plugin-development` | "plugin review", "plugin architecture", "activation hook", "Settings API", "Plugin Check" |
| `wp-block-development` | "block review", "Gutenberg", "block.json", "InnerBlocks", "Interactivity API", "dynamic block" |
| `wp-theme-development` | "theme review", "block theme", "theme.json", "FSE", "template parts", "style variations" |
| `wp-woocommerce-dev` | "WooCommerce review", "HPOS", "payment gateway", "cart fragments", "Action Scheduler" |
| `wp-rest-api-development` | "REST API review", "register_rest_route", "permission_callback", "REST endpoint", "API schema" |
| `wp-admin-ui-development` | "admin UI", "settings page", "admin screen", "admin menu", "admin notice" |
| `wp-migration-upgrade-review` | "migration review", "upgrade routine", "dbDelta", "schema change", "backfill" |
| `wp-accessibility-review` | "accessibility review", "a11y", "keyboard navigation", "focus management", "semantic HTML" |
| `wp-test-strategy` | "test strategy", "PHPUnit", "integration tests", "Playwright", "coverage" |

## What Each Skill Covers

All eleven skills produce structured findings with severity labels (`Critical`, `Warning`, `Info`), file references, and concrete recommendations.

### `wp-performance-review`

- Database query anti-patterns
- Expensive hooks and page-load writes
- Object cache and transient usage
- AJAX, HTTP, and polling bottlenecks
- Template-level N+1 patterns
- Asset loading and cron issues

### `wp-security-review`

- XSS and output escaping issues
- SQL injection risks
- CSRF and nonce validation gaps
- Capability and authorization mistakes
- File upload handling risks
- Dangerous functions and sensitive data exposure

### `wp-plugin-development`

- Plugin headers and structure
- Activation, deactivation, and uninstall flows
- CPT and taxonomy registration
- Settings API usage
- Hook design and priority issues
- Internationalization and WordPress.org readiness

### `wp-block-development`

- `block.json` schema validation
- `edit` and `save` function patterns
- Render callbacks and dynamic blocks
- Attribute handling and deprecations
- Interactivity API usage
- Build setup and source/build review

### `wp-theme-development`

- `theme.json` validation
- Template hierarchy and required files
- Template parts and block markup
- Global styles and spacing systems
- Style variations and patterns
- Classic-to-block migration guidance

### `wp-woocommerce-dev`

- HPOS compatibility
- WooCommerce CRUD usage
- Payment gateway safety patterns
- Cart fragments and performance concerns
- Action Scheduler usage
- Template override quality and hook preservation

### `wp-rest-api-development`

- Route registration and namespace design
- `permission_callback` quality
- Request arg validation and sanitization
- Response shape and status codes
- Controller patterns and versioning

### `wp-admin-ui-development`

- Settings pages and admin menus
- Capability-aware screen access
- Admin notices and save feedback
- Screen-specific asset loading
- Settings API and admin UX structure

### `wp-migration-upgrade-review`

- Versioned upgrade routines
- Schema changes and `dbDelta()`
- Data backfills and batching
- Upgrade safety and idempotency
- Rollout and rollback risk

### `wp-accessibility-review`

- Semantic HTML and structure
- Keyboard interaction support
- Focus management
- Form labels and error messaging
- Accessible interactive patterns in themes, blocks, and admin UI

### `wp-test-strategy`

- Unit vs integration vs E2E test selection
- Risk-based coverage planning
- Existing test discovery and gap analysis
- Regression planning for WordPress features
- Coverage guidance for REST, blocks, admin UI, themes, and WooCommerce

## Requirements

- [Claude Code](https://claude.ai/code) or Codex
- A local or project-based skill installation

No additional dependencies are required beyond your agent setup.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, structure, and submission guidance.

Common contribution paths:

- Improve or modernize existing guidance
- Add missing edge cases and anti-patterns
- Expand examples and reference docs
- Propose or implement new WordPress skills

## License

MIT License. See [LICENSE](LICENSE) for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

---

These skills reflect practical WordPress engineering patterns and tradeoffs. They are not affiliated with or endorsed by Claude, Codex, WordPress, WooCommerce, or any hosting platform.
