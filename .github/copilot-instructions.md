<!-- Copilot instructions for AI coding agents in this repository -->

# Sony Gamechangers — Copilot Instructions (concise)

Purpose: give an AI coding agent the minimal, concrete knowledge to be productive in this Next.js + TypeScript repo.

- Project type: Next.js (App Router) + TypeScript + Tailwind CSS. UI components are in `components/ui/` and follow Atomic Design methodology.
- Important scripts (run from repository root):
  - Start dev server: `yarn dev` (uses `next dev`)
  - Install: `yarn install --frozen-lockfile`
  - Build: `yarn build` / `next build`
  - Storybook: `npm run storybook` (dev) / `npm run build-storybook`
  - Tests: `yarn test` (vitest), watch with `yarn test:watch`, coverage `yarn test:coverage`
  - Lint/format: `yarn lint`, `yarn lint:fix`, `yarn format`

Atomic Design structure (strictly enforced)

- Component organization follows Atomic Design:
  - `components/ui/foundations/[Component]/` - Design system fundamentals (Typography, ColorTokens)
  - `components/ui/atoms/[Component]/` - Basic building blocks (Button, Input, Modal)
  - `components/ui/molecules/[Component]/` - Simple component groups (FormControl, SearchBar)
  - `components/ui/organisms/[Component]/` - Complex UI sections (Header, Footer)
- Each component folder contains:
  - `[Component].tsx` - Main component (PascalCase)
  - `[Component].test.tsx` - Unit tests
  - `[Component].stories.tsx` - Storybook stories
  - `[Component].types.ts` - Type definitions (optional)
  - `index.tsx` - Barrel export
- Naming: All files and folders use PascalCase matching component name

Quick architecture notes you must follow

- App Router + server/client split: server components (SC) are used for layouts and data fetching; client components (CC) are used for visual UI and live interactions. See `docs/CODE_GUIDELINES.md` for exact rules.
- Rule: CC may import SC; SC must never import CC. CCs should include the client directive at the top (project convention: `use client`).
- Location patterns:
  - Pages & layouts: `app/` (Next App Router)
  - Foundations: `components/ui/foundations/[Component]/[Component].tsx`
  - Atoms: `components/ui/atoms/[Component]/[Component].tsx`
  - Molecules: `components/ui/molecules/[Component]/[Component].tsx`
  - Organisms: `components/ui/organisms/[Component]/[Component].tsx`
  - Stories: `components/ui/**/*.stories.tsx`
  - Tests: `*.test.tsx` or `*.test.ts` colocated with source files

Component & styling conventions (concrete)

- Use Tailwind utilities directly; styles are mostly inline Tailwind classes and CSS variables from `styles/theme.css` and `styles/tokens.css`.
- Use `cn()` utility (`utils/cn.ts`) to compose class strings and `class-variance-authority` (CVA) for variants. Example: `components/ui/atoms/FormControl/FormControl.tsx` uses `cn()` heavily and composes small helpers.
- Always export named components (e.g. `export function Button(...)`) and match filename with exported symbol.
- `className` should be last prop in JSX root.

Internationalization (i18n) - CRITICAL

**All user-facing strings MUST be internationalized using next-intl.**

- ❌ Never hardcode strings: `label="Home"`, `<button>Click me</button>`
- ✅ Always use translations: `label={t('home')}`, `<button>{t('clickMe')}</button>`

```tsx
import { useTranslations } from 'next-intl'

export function MyComponent() {
  const t = useTranslations('ComponentName')
  return <h1>{t('title')}</h1>
}
```

- Translation keys in `messages/en.json` and `messages/fr.json`
- Use descriptive namespaces: `Sidebar.*`, `MobileHeader.*`, etc.
- For navigation, use `Link` from `@/i18n/navigation` (NOT `next/link`)

```tsx
import { Link } from '@/i18n/navigation' // ✅ Correct
import Link from 'next/link' // ❌ Wrong - doesn't handle locale
```

Radix & accessibility patterns

- Radix primitives should be wrapped in project components (do not leak primitives directly into pages). Use `asChild` when appropriate.
- Follow accessibility guidance in `docs/A11Y.md` and prefer role/text queries in tests (see `docs/CODE_GUIDELINES.md`).

Performance & Responsive Hooks - CRITICAL

**Never create manual resize listeners. Always use optimized hooks:**

```tsx
// ✅ Correct - uses matchMedia API (efficient, only fires on breakpoint changes)
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'

const isMobile = !useMediaQuery(BREAKPOINTS.md)
const isDesktop = useMediaQuery(BREAKPOINTS.lg)

// ✅ Correct - debounced window size (150ms default)
import { useWindowSize } from '@/hooks/useMediaQuery'
const { width, height } = useWindowSize(150)

// ❌ NEVER DO THIS - causes excessive re-renders, fails performance review
useEffect(() => {
  const handler = () => setWidth(window.innerWidth)
  window.addEventListener('resize', handler)
  return () => window.removeEventListener('resize', handler)
}, [])
```

**Breakpoint constants:**

- Use `BREAKPOINTS` from `common/breakpoints.ts` (matches Tailwind: sm=640px, md=768px, lg=1024px, xl=1280px, 2xl=1536px)
- Never hardcode pixel values like `'(min-width: 768px)'` - use `BREAKPOINTS.md` instead

**Why this matters:**

- matchMedia API only fires on actual breakpoint changes (not every pixel)
- Debounced hooks prevent rapid-fire state updates during resizing
- Centralized breakpoints stay in sync with Tailwind classes
- Hooks handle test environments gracefully (no matchMedia mock needed)

Testing & Storybook

- Unit tests use Vitest + React Testing Library. Tests live next to the source file.
- Prefer testing behavior (roles, visible text) not implementation details.
- Storybook is used for isolated visual development — start with `npm run storybook` and reference stories when adding or changing UI behavior.

Linting / Formatting

- ESLint and Prettier are enforced. Use `yarn lint:fix` and `yarn format` before opening PRs.

Repository conventions and commit/PR format

- Branch naming: `feature/TICKET-ID-description` or `fix/TICKET-ID-description`.
- Commit/PR title format: `[TICKET-ID] Concise description`.
- Conventional commit prefix for commits: `feat`, `fix`, `chore`, `refactor`, `test`, `docs` (see `docs/CODE_GUIDELINES.md`).

Concrete file references to consult when you need examples

- Atomic Design structure: See `docs/CODE_GUIDELINES.md` for complete folder organization
- Foundations example: `components/ui/foundations/Typography/Typography.tsx` — design system fundamentals
- Atoms example: `components/ui/atoms/Button/Button.tsx` — shows CVA variants, `cn()` usage, and comprehensive testing (31 tests, 13 stories)
- Molecules example: `components/ui/molecules/FormControl/FormControl.tsx` — shows `cn()` usage, helper subcomponents, and composition patterns
- App root layout: `app/layout.tsx` — minimal server layout placeholder
- Global guidelines and naming conventions: `docs/CODE_GUIDELINES.md`
- Storybook organization: `.storybook/STORY_GUIDELINES.md`
- Scripts & dependencies: `package.json` (Next 16, React 19, TypeScript 5, Vitest)

When editing code, prefer small, focused changes

- Keep components single responsibility, named exports, and place tests/stories next to the modified file.
- If you add or change visual behavior, update or add a Storybook story and include a small test for the behavior.

What not to assume

- Do not assume any custom monorepo tooling — this is a single app repository.
- Do not change global build scripts or package manager (project uses Yarn for install/dev in README but Storybook commands run via `npm run ...` in README; prefer using `yarn` for install and `npm run storybook` when following README). If in doubt, run the exact script from `package.json`.

If you need more context or a deeper merge of older instruction files, ask for permission to inspect `docs/` and `components/ui/` more broadly; I will produce an updated draft.

---

Requested-by: developer (automatically generated)
