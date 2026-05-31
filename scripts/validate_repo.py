#!/usr/bin/env python3

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def parse_frontmatter(path: Path) -> dict[str, str]:
    text = path.read_text(encoding="utf-8")
    match = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if not match:
        fail(f"Missing or invalid front matter in {path.relative_to(ROOT)}")

    fields: dict[str, str] = {}
    for line in match.group(1).splitlines():
        if ":" not in line:
            fail(f"Malformed front matter line in {path.relative_to(ROOT)}: {line}")
        key, value = line.split(":", 1)
        fields[key.strip()] = value.strip()
    return fields


def get_skill_names(base: Path) -> list[str]:
    skills = sorted(path.parent.name for path in base.glob("*/SKILL.md"))
    if not skills:
        fail(f"No skills found in {base.relative_to(ROOT)}/")
    return skills


def validate_skill_frontmatter(base: Path, expected: list[str]) -> None:
    for skill_name in expected:
        skill_path = base / skill_name / "SKILL.md"
        if not skill_path.exists():
            fail(f"Missing {skill_path.relative_to(ROOT)}")
        fields = parse_frontmatter(skill_path)
        if fields.get("name") != skill_name:
            fail(
                f"Front matter name mismatch in {skill_path.relative_to(ROOT)}: "
                f"expected '{skill_name}', found '{fields.get('name')}'"
            )
        if "description" not in fields:
            fail(f"Missing description in {skill_path.relative_to(ROOT)}")


def validate_parallel_skill_sets() -> list[str]:
    claude_skills = get_skill_names(ROOT / "claude-skills")
    codex_skills = get_skill_names(ROOT / "codex-skills")

    validate_skill_frontmatter(ROOT / "claude-skills", claude_skills)
    validate_skill_frontmatter(ROOT / "codex-skills", codex_skills)

    if claude_skills != codex_skills:
        fail(
            "Claude and Codex skill sets differ: "
            f"claude={claude_skills}, codex={codex_skills}"
        )

    return claude_skills


def validate_claude_plugin_layout(skills: list[str]) -> None:
    plugin_manifest = ROOT / ".claude-plugin" / "plugin.json"
    if not plugin_manifest.exists():
        fail("Missing Claude plugin manifest at .claude-plugin/plugin.json")

    try:
        manifest = json.loads(plugin_manifest.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        fail(f"Invalid JSON in {plugin_manifest.relative_to(ROOT)}: {exc}")
        return

    if manifest.get("name") != "wordpress-skills":
        fail(".claude-plugin/plugin.json should declare plugin name 'wordpress-skills'")

    plugin_skills = ROOT / "skills"
    if not plugin_skills.exists():
        fail("Missing Claude plugin skills/ directory or alias at repo root")

    plugin_skill_names = get_skill_names(plugin_skills)
    if plugin_skill_names != skills:
        fail(
            "Claude plugin skills/ tree differs from claude-skills/: "
            f"skills={plugin_skill_names}, claude-skills={skills}"
        )


def validate_commands() -> list[str]:
    command_files = sorted((ROOT / "commands").glob("*.md"))
    if not command_files:
        fail("No commands found in commands/")

    commands: list[str] = []
    for path in command_files:
        fields = parse_frontmatter(path)
        if "description" not in fields:
            fail(f"Missing description in {path.relative_to(ROOT)}")
        commands.append(path.stem)
    return commands


def validate_reference_dirs(skills: list[str]) -> None:
    for skill_name in skills:
        ref_dir = ROOT / "claude-skills" / skill_name / "references"
        if not ref_dir.exists():
            fail(f"Missing shared reference directory {ref_dir.relative_to(ROOT)}")

        codex_text = (ROOT / "codex-skills" / skill_name / "SKILL.md").read_text(encoding="utf-8")
        if "../../claude-skills/" not in codex_text:
            fail(
                f"Codex wrapper {skill_name} does not reference shared claude-skills content"
            )


def validate_docs(skills: list[str], commands: list[str]) -> None:
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    claude = (ROOT / "CLAUDE.md").read_text(encoding="utf-8")
    contributing = (ROOT / "CONTRIBUTING.md").read_text(encoding="utf-8")
    changelog = (ROOT / "CHANGELOG.md").read_text(encoding="utf-8")

    for skill in skills:
        if skill not in readme:
            fail(f"README.md does not mention shipped skill '{skill}'")

    for command in commands:
        if f"/{command}" not in readme:
            fail(f"README.md does not mention command '/{command}'")

    if "python3 scripts/validate_repo.py" not in claude:
        fail("CLAUDE.md should document the validator command")
    if "python3 scripts/validate_repo.py" not in contributing:
        fail("CONTRIBUTING.md should document the validator command")
    if "docs/" not in readme:
        fail("README.md should mention the docs/ site")
    if "## [2.1.0]" not in changelog:
        fail("CHANGELOG.md should include the current release entry")


def main() -> None:
    skills = validate_parallel_skill_sets()
    validate_claude_plugin_layout(skills)
    commands = validate_commands()
    validate_reference_dirs(skills)
    validate_docs(skills, commands)
    print("Repository validation passed.")


if __name__ == "__main__":
    main()

