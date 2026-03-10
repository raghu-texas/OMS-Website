# Copilot Instructions for medera-health-hub

## Project Overview
- **Type:** Vite + React + TypeScript SPA
- **UI:** Tailwind CSS, shadcn-ui components (see `src/components/ui/`)
- **Purpose:** Healthcare/Oral Surgery practice management web app (OnlineMedSys branding)

## Key Structure & Patterns
- **Entry:** `src/main.tsx` (mounts `App.tsx`)
- **Pages:** `src/pages/` (top-level routes, e.g., `Login.tsx`, `AboutUs.tsx`)
- **Shared Components:** `src/components/` (site-wide UI, e.g., `Header`, `Footer`, `WhyChoose`)
- **UI Library:** All custom UI primitives in `src/components/ui/` (prefer reusing these)
- **Assets:** Images in `src/assets/`
- **Routing:** Uses `react-router-dom` (see `Link` usage in components)
- **Styling:** Tailwind utility classes throughout; global styles in `App.css`, `index.css`
- **Utilities:** Shared helpers in `src/lib/utils.ts`

## Developer Workflows
- **Install:** `npm i`
- **Dev server:** `npm run dev` (hot reload)
- **Build:** `npm run build`
- **Preview:** `npm run preview`
- **No formal test suite present** (as of Dec 2025)
- **Deploy:** Use Lovable platform (see README)

## Project Conventions
- **Component Naming:** PascalCase for files and exports
- **Props:** Prefer explicit prop types/interfaces
- **Imports:** Use `@/` alias for `src/` (see `tsconfig.json`)
- **No Redux or Context API** (state is local/component-level)
- **No backend code in this repo**
- **No API calls or data fetching patterns defined**

## Integration & External
- **Lovable platform:** Used for editing, preview, and deployment
- **shadcn-ui:** For accessible, composable UI primitives
- **Tailwind:** For all styling; avoid inline styles

## Examples
- **Component reuse:** See `src/components/WhyChoose.tsx` for pattern: stateless, presentational, Tailwind classes, no side effects
- **UI primitives:** Use e.g. `Button` from `src/components/ui/button.tsx` instead of custom buttons

## When in doubt
- Reference the README for setup and deployment
- Follow the structure and style of existing components
- Ask for clarification if a pattern or workflow is unclear
