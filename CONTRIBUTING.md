# Contributing to ttrungn-portfolio

Thanks for your interest in contributing! This is a personal portfolio site, but
contributions that improve the codebase, fix bugs, or enhance the experience are
welcome.

## Code of Conduct

Be respectful and constructive. Harassment, discrimination, or hostile behavior
will not be tolerated.

## Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+

### Setup

```bash
# 1. Fork and clone the repository
git clone https://github.com/<your-username>/ttrungn-portfolio.git
cd ttrungn-portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev        # http://localhost:5173
```

### Verify your environment

```bash
npm run lint       # ESLint must pass with no errors
npm run build      # type-check + production build must succeed
```

## Project Structure

```
src/
  data/         CV content (resume.ts) + ASCII avatar art (avatar.ts)
  hooks/        useTypewriter, useDecrypt, useTerminalCommands
  components/   layout/, terminal/, ui/
  routes/       Home, About, Work, Stack, Contact, NotFound
```

See [README.md](README.md) for the full breakdown.

## How to Contribute

### Reporting Bugs

Open an issue with:
- A clear title and description
- Steps to reproduce
- Expected vs. actual behavior
- Browser/OS and a screenshot if it's a visual bug

### Suggesting Enhancements

Open an issue describing the enhancement, why it's useful, and any implementation
ideas.

### Submitting Changes

1. Create a branch from `main`:
   ```bash
   git checkout -b feat/short-description
   ```
2. Make your changes, keeping them focused and minimal.
3. Run `npm run lint` and `npm run build` — both must pass.
4. Commit using [Conventional Commits](https://www.conventionalcommits.org/):
   ```
   feat(stack): add animated proficiency tooltip
   fix(contact): validate email before submit
   docs(readme): clarify deploy steps
   ```
5. Push your branch and open a Pull Request against `main`.

## Coding Guidelines

- **TypeScript strict** — no `any` unless unavoidable; prefer precise types.
- **Function components + hooks** — no class components.
- **Single source of truth** — all CV content lives in `src/data/resume.ts`. Do
  not hardcode personal data inside components.
- **Tailwind v4** — use the theme tokens (`text-phosphor`, `text-accent`, etc.)
  defined in `src/index.css`. Avoid inline hex colors.
- **Accessibility** — keep `aria-label`s on decorative/interactive elements and
  respect `prefers-reduced-motion`.
- **Match existing style** — follow the patterns already in the codebase.

## Pull Request Checklist

- [ ] `npm run lint` passes with no errors
- [ ] `npm run build` succeeds
- [ ] Changes are focused and scoped to a single concern
- [ ] No unrelated files or formatting changes in the diff
- [ ] Commit messages follow Conventional Commits
- [ ] UI changes include a before/after screenshot

## License

By contributing, you agree that your contributions will be licensed under the
same license as this project.
