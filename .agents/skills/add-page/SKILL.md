---
name: add-page
description: "Add a new route/page to the ttrungn-portfolio terminal site. USE WHEN: adding a section like ~/blog, ~/uses, or any new navigable page."
argument-hint: "The page name (e.g. 'blog') and what it should show."
---

# Add a New Page

Add a new navigable route that matches the terminal aesthetic (boot sequence,
typewriter, standing prompt, nav highlight).

## Files You Will Touch

1. `src/routes/<Name>.tsx` — new page component (create)
2. `src/App.tsx` — register the route (edit)
3. `src/components/layout/TopBar.tsx` — add the nav link (edit)
4. `src/hooks/useTerminalCommands.ts` — add the `cd`/`ls` route (edit)

## Procedure

### STEP 1 — Create the route component

Create `src/routes/<Name>.tsx`. Copy the shape of an existing simple route like
`src/routes/Work.tsx`. Every page MUST:

- Define a `boot` array of `TypeLine`s (a terminal command + 1–2 output lines).
- Wrap its body in `<PageScaffold boot={boot}>`.
- Use `SectionHeading` for headings and theme tokens for color.
- Pull any real data from `src/data/resume.ts` — do not hardcode CV facts.

```tsx
import { PageScaffold } from '@/components/layout/PageScaffold'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { TypeLine } from '@/hooks/useTypewriter'

const boot: TypeLine[] = [
  { text: 'cat blog.md', kind: 'cmd', className: 'text-accent', speed: 24 },
  { text: 'loading entries...', className: 'text-phosphor-dim', speed: 12 },
]

export function Blog() {
  return (
    <PageScaffold boot={boot}>
      <SectionHeading>blog</SectionHeading>
      <p className="max-w-[70ch] text-phosphor">...</p>
    </PageScaffold>
  )
}
```

### STEP 2 — Register the route

In `src/App.tsx`, import the component and add a child route **before** the
catch-all `{ path: '*', element: <NotFound /> }`:

```tsx
{ path: 'blog', element: <Blog /> },
```

### STEP 3 — Add the nav link

In `src/components/layout/TopBar.tsx`, add an entry to the `NAV` array:

```ts
{ to: '/blog', label: 'blog', route: 'blog' },
```

### STEP 4 — Wire the terminal command

In `src/hooks/useTerminalCommands.ts`, add the route to the `ROUTES` map and to
the `ls` output string:

```ts
const ROUTES = { /* ...existing... */ blog: '/blog' }
// and update the `ls` response to include "blog"
```

### STEP 5 — Verify

```bash
npm run lint
npm run build
```

Both must pass. Then click the new nav link and type `cd blog` / `ls` to confirm
navigation and the terminal command work.

## Checklist

- [ ] Route component wraps content in `PageScaffold`
- [ ] Registered in `App.tsx` before the catch-all
- [ ] Nav link added in `TopBar.tsx`
- [ ] `cd <name>` and `ls` updated in `useTerminalCommands.ts`
- [ ] No hardcoded CV data (use `resume.ts`)
- [ ] `lint` + `build` pass
