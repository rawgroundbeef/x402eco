# Contributing to x402.eco

The x402.eco ecosystem directory is open source. Anyone building on x402 can add their project, and anyone who has built an agent skill can list it here too.

## Adding Your Project

Each ecosystem entry is a single JSON file in `data/ecosystem/{category}/`.

### 1. Pick your category

| Directory | Tab | What goes here |
|-----------|-----|----------------|
| `client-integrations/` | Client-Side | SDKs, libraries, agent frameworks |
| `services-endpoints/` | Services | APIs and services that accept x402 payments |
| `infrastructure-tooling/` | Infrastructure | Developer tools, testing utilities, validators |
| `facilitators/` | Facilitators | Payment verification and settlement services |
| `learning-community/` | Learning | Docs, tutorials, community resources |
| `skills/` | Skills | Standalone agent skills (not tied to another category) |

### 2. Create your JSON file

Add a file named `your-project.json` in the appropriate category directory:

```json
{
  "name": "Your Project",
  "description": "A short description of what your project does.",
  "url": "https://your-project.com",
  "category": "facilitators"
}
```

**Fields:**

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Display name |
| `description` | Yes | One-liner description (keep it under ~100 characters) |
| `url` | Yes | Primary link (website, repo, or docs) |
| `category` | Yes | Must match the directory name |
| `logo` | No | Path relative to `public/` (e.g., `"/logos/your-project.svg"`) |
| `tags` | No | Array of tags for future filtering |
| `install_command` | No | CLI install command if you have a skill (see below) |

### 3. Add a logo (optional)

Drop your logo in `public/logos/` as an SVG or PNG. Reference it in your JSON:

```json
"logo": "/logos/your-project.svg"
```

### 4. Open a PR

- Branch off `main`
- Add your JSON file (and logo if applicable)
- PR title: `ecosystem: add {Your Project}`
- We'll review and merge

## Adding a Skill

Skills show up in the **Skills** tab of the ecosystem directory. There are two ways to add one:

### Option A: Skill for an existing ecosystem entry

If your project is already listed (e.g., as a facilitator or infrastructure tool), just add `install_command` to your existing JSON file:

```json
{
  "name": "OpenFacilitator",
  "description": "Free, open-source x402 facilitator.",
  "url": "https://www.openfacilitator.io",
  "category": "facilitators",
  "logo": "/logos/openfacilitator.svg",
  "install_command": "npx skills add rawgroundbeef/openfacilitator"
}
```

Your entry will appear in its original category **and** in the Skills tab automatically.

### Option B: Standalone skill

If your skill isn't tied to another ecosystem entry, add it directly to `data/ecosystem/skills/`:

```json
{
  "name": "My Skill",
  "description": "What this skill teaches agents to do.",
  "url": "https://github.com/you/your-skill",
  "category": "skills",
  "install_command": "npx skills add you/your-skill"
}
```

### Install command format

Use the `npx skills add` format with a GitHub `owner/repo` path:

```
npx skills add <github-user>/<repo>
```

### What makes a skill

Your skill repo needs a `SKILL.md` file at the root with YAML frontmatter and instructions. See the [Agent Skills spec](https://agentskills.io/specification) for the full format. Minimal example:

```yaml
---
name: your-skill
description: What this skill does and when to use it.
---

Instructions for the agent when this skill is active.
```

## PR Checklist

- [ ] JSON is valid (run `node -e "require('./data/ecosystem/...')"` to check)
- [ ] `category` matches the directory your file is in
- [ ] `description` is concise
- [ ] `url` points to a live page
- [ ] Logo is SVG or PNG, reasonably sized (under 50KB)
- [ ] If adding a skill, `install_command` uses the `npx skills add` format
