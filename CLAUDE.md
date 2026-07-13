# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains a parallel WordPress skill pack for Claude Code and Codex covering fourteen domains:

- Performance reviews
- Security reviews
- Plugin architecture reviews
- Block development reviews
- Theme development reviews
- WooCommerce development reviews
- REST API reviews
- Admin UI reviews
- Migration and upgrade reviews
- Accessibility reviews
- Test strategy reviews
- WP-CLI and operations reviews
- Playground reviews
- PHPStan reviews

The Claude and Codex wrappers are designed for WordPress 6.x+ codebases and provide structured review workflows, shared reference docs, quick triage commands for Claude, and cross-skill handoffs when a finding belongs in another specialty.

## Repository Structure

```
claude-skills/                 # Claude skill definitions and shared references
  wp-performance-review/
    SKILL.md                   # Main skill file with YAML frontmatter
    references/                # Supporting documentation
  wp-security-review/
    SKILL.md
    references/
  wp-plugin-development/
    SKILL.md
    references/
  wp-block-development/
    SKILL.md
    references/
  wp-theme-development/
    SKILL.md
    references/
  wp-woocommerce-dev/
    SKILL.md
    references/
  wp-rest-api-development/
    SKILL.md
    references/
  wp-admin-ui-development/
    SKILL.md
    references/
  wp-migration-upgrade-review/
    SKILL.md
    references/
  wp-accessibility-review/
    SKILL.md
    references/
  wp-test-strategy/
    SKILL.md
    references/
  wp-wpcli-and-ops/
    SKILL.md
    references/
  wp-playground-development/
    SKILL.md
    references/
  wp-phpstan-review/
    SKILL.md
    references/

codex-skills/                  # Codex-oriented wrappers for the same domains
  wp-performance-review/
    SKILL.md
  wp-security-review/
    SKILL.md
  wp-plugin-development/
    SKILL.md
  wp-block-development/
    SKILL.md
  wp-theme-development/
    SKILL.md
  wp-woocommerce-dev/
    SKILL.md
  wp-rest-api-development/
    SKILL.md
  wp-admin-ui-development/
    SKILL.md
  wp-migration-upgrade-review/
    SKILL.md
  wp-accessibility-review/
    SKILL.md
  wp-test-strategy/
    SKILL.md
  wp-wpcli-and-ops/
    SKILL.md
  wp-playground-development/
    SKILL.md
  wp-phpstan-review/
    SKILL.md

commands/                      # Slash command definitions
  wp-perf-review.md            # Full performance review command
  wp-perf.md                   # Quick performance triage command
  wp-sec-review.md             # Full security review command
  wp-sec.md                    # Quick security triage command
  wp-plugin-review.md          # Full plugin architecture review command
  wp-plugin.md                 # Quick plugin architecture scan
  wp-block-review.md           # Full block development review command
  wp-block.md                  # Quick block development scan
  wp-theme-review.md           # Full theme development review command
  wp-theme.md                  # Quick theme development scan
  wp-woo-review.md             # Full WooCommerce development review command
  wp-woo.md                    # Quick WooCommerce scan
  wp-rest-review.md            # Full REST API review command
  wp-rest.md                   # Quick REST API scan
  wp-admin-review.md           # Full admin UI review command
  wp-admin.md                  # Quick admin UI scan
  wp-migration-review.md       # Full migration and upgrade review command
  wp-migration.md              # Quick migration scan
  wp-a11y-review.md            # Full accessibility review command
  wp-a11y.md                   # Quick accessibility scan
  wp-test-review.md            # Full test strategy review command
  wp-test.md                   # Quick testing strategy scan
  wp-ops-review.md             # Full WP-CLI and operations review command
  wp-ops.md                    # Quick WP-CLI and operations scan
  wp-playground-review.md      # Full Playground review command
  wp-playground.md             # Quick Playground scan
  wp-phpstan-review.md         # Full PHPStan review command
  wp-phpstan.md                # Quick PHPStan scan

README.md                      # Public documentation and installation guidance
CHANGELOG.md                   # Release history
CONTRIBUTING.md                # Contribution guidance
```

## Adding New Skills

1. Create directory: `claude-skills/wp-your-skill/`
2. Create `SKILL.md` with YAML frontmatter:
   ```yaml
   ---
   name: skill-name
   description: Trigger phrases and when to use. Max 1024 chars.
   ---
   ```
3. Add references in `claude-skills/wp-your-skill/references/` if needed
4. Create a parallel Codex wrapper in `codex-skills/wp-your-skill/` when the domain should also be available in Codex
5. Add slash commands in `commands/` if the Claude skill needs explicit invocation
6. Update `README.md` skill and command tables
7. Update `CHANGELOG.md`

## Adding Slash Commands

Create a markdown file in `commands/` with:
```yaml
---
description: What the command does
argument-hint: "[optional-args]"
---
```

## Code Standards

PHP examples must follow WordPress PHP Coding Standards:
- Spaces inside parentheses: `function_name( $arg )`
- Use `array()` not `[]`
- Yoda conditions: `if ( true === $value )`
- Snake_case for variables/functions
- Prefix custom functions: `prefix_function_name()`

Use consistent severity labels in skill content:
- **CRITICAL**: Vulnerability, broken behavior, review blocker, or high-risk production issue
- **WARNING**: Significant correctness, maintainability, compatibility, or performance concern
- **INFO**: Lower-risk improvement, modernization, or follow-up opportunity

Each individual skill may further interpret severity in its own domain, but these global meanings should stay stable across the whole pack.

## Testing Changes

```bash
# Review the changed Claude skill and command together
sed -n '1,120p' claude-skills/wp-your-skill/SKILL.md
sed -n '1,80p' commands/wp-your-command.md

# If you test by copying a single Claude skill locally
cp -r claude-skills/wp-your-skill ~/.claude/skills/

# If you test the Codex wrapper locally
cp -r codex-skills/wp-your-skill ~/.codex/skills/
mkdir -p ~/.codex/claude-skills/wp-your-skill
cp -r claude-skills/wp-your-skill/references ~/.codex/claude-skills/wp-your-skill/

# Validate repository metadata and docs
python3 scripts/validate_repo.py
```

## Versioning

When releasing, keep versioned metadata and docs in sync wherever they exist for the distribution method you are using. At minimum:

- Update `CHANGELOG.md`
- Update any plugin or marketplace manifest files checked into the repo
- Make sure `README.md` reflects newly added skills or commands
