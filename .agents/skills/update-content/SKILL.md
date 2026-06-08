---
name: update-content
description: "Change CV text, projects, skills, education, or contact info in ttrungn-portfolio. USE WHEN: the resume/portfolio content needs updating."
argument-hint: "What content to change (e.g. 'add a new job', 'update GitHub URL')."
---

# Update Portfolio Content

All visible CV content is data-driven from a single typed file. You almost never
edit page components to change content — you edit the data.

## The One File

`src/data/resume.ts` — the single source of truth. It exports typed objects that
every page consumes:

| Export | Drives | Page |
|--------|--------|------|
| `profile` | name, handle, title, summary | Home, About |
| `contact` | email, phone, github, linkedin, location | Home, Contact |
| `experience` | job history (role, company, highlights, tech) | About |
| `projects` | project cards (name, url, description, tech) | Work |
| `education` | degrees | About |
| `skillGroups` | grouped skill tags | Stack |
| `skillBars` | proficiency tags | Stack |
| `languages` | spoken languages | About |

## Procedure

### Editing existing content

1. Open `src/data/resume.ts`.
2. Find the relevant export and edit the value(s). Keep the existing TypeScript
   shape — each array item must match its interface (e.g. `ExperienceItem`,
   `ProjectItem`).
3. Save. The dev server hot-reloads; the page updates automatically.

### Adding a new item

- **New job:** add an `ExperienceItem` object to the `experience` array.
- **New project:** add a `ProjectItem` to `projects` (include a unique `id` like
  `proj_003`).
- **New skill group:** add a `SkillGroup` to `skillGroups`.

### Changing the avatar image

Replace `public/avatar.jpg` with a new photo (same filename). A white/plain
background works best — the converter maps dark pixels to glyphs and leaves light
background blank.

### Adding the resume PDF

Drop the file at `public/resume.pdf`. The Home page already links to it.

## Rules

- Do NOT hardcode content into route components — always go through `resume.ts`.
- Match the existing object shape; let TypeScript guide you (no `any`).
- Keep tech-tag strings consistent (e.g. `'.NET 8'`, not `'dotnet 8'`).

## Verify

```bash
npm run build   # type-checks the data against its interfaces
```

If a field has the wrong type or a required field is missing, the build fails —
fix it before finishing.
