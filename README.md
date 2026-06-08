# ttrungn-portfolio

A hacker/terminal-themed personal portfolio for **Nguyen Thanh Trung (ttrungn)** —
Software Engineer specializing in the .NET ecosystem.

Built with the latest React stack and a phosphor-CRT aesthetic: matrix rain,
ASCII avatar with a "decrypt" reveal, per-page typewriter boot sequences, and a
keyboard-driven terminal (`ls`, `cd about`, `whoami`, `help`).

## Tech Stack

| Layer       | Choice |
|-------------|--------|
| Framework   | React 19 (`useActionState` Actions, function components) |
| Build       | Vite 8 + `@vitejs/plugin-react` |
| Language    | TypeScript 6 (strict) |
| Routing     | React Router v7 (`createBrowserRouter`) |
| Styling     | Tailwind CSS v4 (CSS-first `@theme` config) |
| Data        | Typed `src/data/resume.ts` (single source of truth) |

## Project Structure

```
src/
  main.tsx                 app entry
  App.tsx                  router (Shell + 5 routes + 404)
  index.css                Tailwind v4 theme + CRT/glitch/cursor effects
  data/
    resume.ts              all CV content (typed)
    avatar.ts              ASCII avatar frames
  hooks/
    useTypewriter.ts       char-by-char line typing (StrictMode-safe)
    useDecrypt.ts          scramble -> reveal effect
    useTerminalCommands.ts global ls / cd / whoami / help
  components/
    layout/                Shell, TopBar, MatrixRain, PageScaffold
    terminal/              BootSequence, Cursor
    ui/                    AsciiAvatar, ProjectCard, SkillBar, SectionHeading, TagList, InfoList
  routes/                  Home, About, Work, Stack, Contact, NotFound
```

## Scripts

```bash
npm install      # install dependencies
npm run dev      # start dev server (http://localhost:5173)
npm run build    # type-check + production build -> dist/
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Editing Content

All CV content lives in `src/data/resume.ts` — update the typed objects
(`profile`, `contact`, `experience`, `projects`, `education`, `skillGroups`,
`skillBars`) and every page updates automatically.

Replace the ASCII avatar in `src/data/avatar.ts`.

## Resume Download

Drop your CV PDF at `public/resume.pdf`. The Home page links to `/resume.pdf`.

## Contact Form

The contact form uses React 19's `useActionState`. The `sendMessage` action in
`src/routes/Contact.tsx` currently simulates an async send. To wire real
delivery, replace the simulated `await` with a POST to Formspree / EmailJS / your
own API endpoint.

## Deploy

The app builds to static files in `dist/`.

- **VPS / static host:** serve `dist/` behind Nginx/Caddy with a SPA fallback so
  deep links (`/about`, `/work`, ...) resolve to `index.html`:
  ```nginx
  location / { try_files $uri $uri/ /index.html; }
  ```
- **Netlify / Vercel / GitHub Pages:** build command `npm run build`, publish
  directory `dist`. For a subpath deploy, set `base` in `vite.config.ts`.
