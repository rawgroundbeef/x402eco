# x402.eco

The x402 ecosystem directory. Built with Next.js.

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding an ecosystem entry

Entries are JSON files in `data/ecosystem/`. The site picks them up automatically — no code changes needed.

### 1. Choose a category

| Slug | Description |
|------|-------------|
| `client-integrations` | SDKs, libraries, and client-side tools |
| `services-endpoints` | APIs and services monetized with x402 |
| `infrastructure-tooling` | Developer tools, validators, dashboards |
| `facilitators` | Payment facilitators |
| `learning-community` | Guides, tutorials, community resources |

### 2. Create a JSON file

Add a file to `data/ecosystem/{category-slug}/{your-project}.json`:

```json
{
  "name": "Your Project",
  "description": "One or two sentences describing what it does.",
  "url": "https://yourproject.com",
  "category": "infrastructure-tooling",
  "logo": "/logos/your-project.png"
}
```

All fields except `logo` are required. If you don't have a logo, set it to `null` — the site will show a letter fallback.

### 3. Add a logo (optional)

Drop your logo in `public/logos/`. PNG or SVG, any reasonable size.

### 4. Submit a PR

```bash
git checkout -b add-your-project
git add data/ecosystem/ public/logos/
git commit -m "feat(ecosystem): add Your Project"
```

Open a PR against `main`.
