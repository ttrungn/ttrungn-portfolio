---
name: add-component
description: "Build a new UI component for ttrungn-portfolio that matches the phosphor terminal theme. USE WHEN: a page needs a new reusable visual element."
argument-hint: "What the component should render."
---

# Add a UI Component

Create a reusable component that fits the terminal/CRT aesthetic and the existing
patterns under `src/components/`.

## Where Components Live

```
src/components/
  layout/     page frame: Shell, TopBar, MatrixRain, PageScaffold
  terminal/   terminal primitives: BootSequence, Cursor
  ui/         reusable visual pieces: SectionHeading, ProjectCard, TagList,
              InfoList, AsciiAvatar, AsciiImage
```

Put general visual pieces in `ui/`. Put anything tied to the terminal shell in
`layout/` or `terminal/`.

## Conventions to Follow

- **Function component**, named export, props via a typed `interface`.
- **Theme tokens only:** `text-phosphor`, `text-phosphor-dim`, `text-accent`,
  `text-glow`, plus `border-phosphor-dim` / `border-accent`. Avoid raw hex.
- **Tailwind v4** utility classes (the project uses them everywhere). For the
  accent glow use `shadow-[0_0_14px_var(--glow)]`.
- **Accessibility:** add `aria-label` to decorative/interactive elements.
- **No data hardcoding:** if it shows CV data, accept it via props sourced from
  `src/data/resume.ts`.
- Reuse existing primitives (`SectionHeading`, `TagList`, `InfoList`) instead of
  re-implementing them.

## Template

```tsx
interface CalloutProps {
  title: string
  children: React.ReactNode
}

export function Callout({ title, children }: CalloutProps) {
  return (
    <div className="rounded-md border border-phosphor-dim bg-[rgb(155_247_192/0.03)] p-4 transition-all hover:border-accent hover:shadow-[0_0_14px_var(--glow)]">
      <p className="text-xs text-accent text-glow">{title}</p>
      <div className="mt-1 text-phosphor">{children}</div>
    </div>
  )
}
```

## Reference Examples

- A bordered card with hover glow → `src/components/ui/ProjectCard.tsx`
- Tag pills → `src/components/ui/TagList.tsx`
- Two-column term/value list → `src/components/ui/InfoList.tsx`
- A heading → `src/components/ui/SectionHeading.tsx`

## Verify

```bash
npm run lint
npm run build
```

Watch for the React lint rules this project enforces:
- **No `Math.random()` (or other impure calls) during render** — compute random
  values inside an effect/event and store in state (see `AsciiImage.tsx`).
- **No synchronous `setState` in an effect body** — let initial state cover it.
