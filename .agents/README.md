# .agents — Development Skills for ttrungn-portfolio

This folder holds **agent skills**: focused, step-by-step guides that capture how
to make common changes to this project correctly, following its existing
conventions.

When working on this codebase (with an AI agent or by hand), read the relevant
skill first so changes stay consistent.

## Available Skills

| Skill | Use when you need to... |
|-------|--------------------------|
| [add-page](skills/add-page/SKILL.md) | Add a new route/page to the terminal portfolio |
| [update-content](skills/update-content/SKILL.md) | Change CV text, projects, skills, or contact info |
| [add-component](skills/add-component/SKILL.md) | Build a new UI component matching the terminal theme |

## Project Conventions (quick reference)

- **Stack:** React 19, Vite, TypeScript (strict), React Router v7, Tailwind CSS v4.
- **Single source of truth:** all personal/CV data lives in `src/data/resume.ts`.
  Never hardcode personal data inside components.
- **Theme tokens:** use `text-phosphor`, `text-phosphor-dim`, `text-accent`,
  `text-glow` (defined in `src/index.css`). Avoid raw hex colors.
- **Path alias:** import from `@/...` (maps to `src/`).
- **Every page** wraps its body in `<PageScaffold boot={...}>` to get the
  typewriter boot sequence + standing prompt.
- **Verify before done:** `npm run lint` and `npm run build` must both pass.
