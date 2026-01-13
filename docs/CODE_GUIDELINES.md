# 🚀 Sony Gamechangers – Code Style & Guidelines

**Stack:** Next.js (App Router) · Client Components · TypeScript · Tailwind · Radix Primitives · Vitest

---

## 1. UI Components Base Guidelines

**Location (Atomic Design):**

```text
**Location (Atomic Design):**

```

components/ui/foundations/[ComponentName]/ # Typography, ColorTokens, etc.
components/ui/atoms/[ComponentName]/ # Button, Input, etc.
components/ui/molecules/[ComponentName]/ # FormControl, SearchBar, etc.
components/ui/organisms/[ComponentName]/ # Header, Footer, etc.

```

Each component folder contains:
[Component].tsx                            # Main component file
[Component].test.tsx                       # Unit tests
[Component].stories.tsx                    # Storybook stories
index.tsx                                  # Barrel export

Naming convention: All files use PascalCase matching the component name.
```

---

**Conventions:**

- `use client` always at the top of visual components.
- **File naming:** PascalCase for all component files (Button.tsx, not button.tsx).
- **Folder naming:** PascalCase matching component name (Button/, not button/).
- Import order: React → 3rd-party → internal.
- Props types defined before the component.
- Named export (`export function Button`).
- `className` always last prop in JSX root.
- Use `cn()` utility to compose Tailwind classes.
- Avoid inline callbacks in render.

**Tailwind Inline (No CSS Files):**

- Use inline Tailwind utilities directly (more performant, better tree-shaking).
- Use CVA (class-variance-authority) for component variants.
- Leverage design tokens from theme.css (CSS variables).
- Example:

```tsx
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const buttonVariants = cva('inline-flex items-center justify-center rounded-md font-medium', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      outline: 'border border-input hover:bg-accent',
    },
  },
})
```

### Internationalization (i18n):

**Critical:** All user-facing strings MUST be internationalized using next-intl.

```tsx
import { useTranslations } from 'next-intl'

export function MyComponent() {
  const t = useTranslations('ComponentName')

  return <h1>{t('title')}</h1>
}
```

**Rules:**

- ❌ Never hardcode strings: `label="Home"`
- ✅ Always use translations: `label={t('home')}`
- Translation keys in `messages/en.json` and `messages/fr.json`
- Use descriptive namespaces: `Sidebar.*`, `MobileHeader.*`, etc.
- For navigation, use `Link` from `@/i18n/navigation` (NOT `next/link`)

```tsx
import { Link } from '@/i18n/navigation' // ✅ Correct
import Link from 'next/link' // ❌ Wrong - doesn't handle locale
```

### Radix Primitives:

- Never use primitives directly in pages; always wrap them.
- Use asChild when possible.
- Visual styles in .css file.

### Performance:

- Avoid useEffect unless for real side effects.
- useMemo and useCallback only when they reduce renders.
- Keep local UI state only if necessary for visual interaction.

### Animations with Framer Motion:

**Required:** All animations must use Framer Motion with optimized patterns.

**Core Principles:**

1. **LazyMotion** - CRITICAL for bundle size reduction (~30KB savings)
2. **Variants** - Cleaner code, better performance
3. **AnimatePresence** - Smooth exit animations
4. **Gestures** - Interactive feedback (hover, tap)
5. **Layout animations** - FLIP technique for smooth resizing

**Setup:**

```tsx
// Root layout (AppLayout.tsx already configured)
import { LazyMotion, domMax } from 'framer-motion'

export function AppLayout({ children }) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  )
}
```

**Import convention:**

```tsx
// ✅ Use m shorthand for better performance
import { m, AnimatePresence } from 'framer-motion'

// ❌ Don't use full motion import
import { motion } from 'framer-motion'
```

**Variants pattern:**

```tsx
// ✅ Correct - reusable, performant
const variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

<m.div variants={variants} initial="hidden" animate="visible" transition={{ duration: 0.3 }}>
  {children}
</m.div>

// ❌ Wrong - inline values are less performant
<m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
  {children}
</m.div>
```

**Gestures:**

```tsx
// Button feedback
<m.span whileTap={{ scale: 0.95 }} transition={{ duration: 0.1 }}>
  {children}
</m.span>

// Card hover effect
<m.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
  {children}
</m.div>
```

**Exit animations:**

```tsx
import { AnimatePresence, m } from 'framer-motion'

<AnimatePresence mode="wait">
  {isOpen && (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </m.div>
  )}
</AnimatePresence>
```

**Layout animations (FLIP):**

```tsx
// Smooth height/width changes
<m.div layout transition={{ duration: 0.3, ease: 'easeInOut' }}>
  {children}
</m.div>
```

**Staggered animations:**

Use `AnimatedSection` component for consistent page entry animations:

```tsx
import { AnimatedSection } from '@/components/ui/foundations/AnimatedSection'

// Single element
<AnimatedSection delay={0}>
  <Header />
</AnimatedSection>

// Staggered list
{items.map((item, index) => (
  <AnimatedSection key={item.id} delay={0.1 + index * 0.05}>
    <Card {...item} />
  </AnimatedSection>
))}
```

**Testing animations:**

```tsx
import { render, screen, waitFor } from '@testing-library/react'

// Use waitFor for animated content
it('shows content after animation', async () => {
  render(<AnimatedComponent />)
  
  await waitFor(() => {
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
```

**Performance tips:**

- ✅ Use LazyMotion wrapper at root level
- ✅ Use m instead of motion
- ✅ Define variants outside component
- ✅ Use layout prop for size changes (FLIP technique)
- ✅ Keep transitions short (0.2-0.3s)
- ❌ Don't animate on every render
- ❌ Don't use heavy transforms on large elements
- ❌ Don't nest too many animated components

### Responsive Hooks & Media Queries:

**Always use centralized hooks for responsive behavior:**

```tsx
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'

// ✅ Correct - uses matchMedia API (efficient)
const isMobile = !useMediaQuery(BREAKPOINTS.md)
const isDesktop = useMediaQuery(BREAKPOINTS.lg)

// ❌ Wrong - manual resize listeners cause excessive re-renders
useEffect(() => {
  const handler = () => setWidth(window.innerWidth)
  window.addEventListener('resize', handler)
  return () => window.removeEventListener('resize', handler)
}, [])
```

**Available hooks:**

- `useMediaQuery(query)` - Detects breakpoint changes via matchMedia API
- `useWindowSize(debounceMs?)` - Returns debounced window dimensions (default 150ms)

**Breakpoint constants:**

```tsx
import { BREAKPOINTS } from '@/common/breakpoints'

// Matches Tailwind defaults: sm=640px, md=768px, lg=1024px, xl=1280px, 2xl=1536px
const isTablet = useMediaQuery(BREAKPOINTS.md)
```

**Why use these hooks:**

- ⚡ matchMedia API fires only on actual breakpoint changes (not every pixel)
- ⚡ Debounced resize prevents rapid-fire state updates
- ⚡ Centralized breakpoints stay in sync with Tailwind classes
- ✅ Defensive checks handle test environments without browser APIs

---

## 2. Custom Hooks Guidelines

Location:

```bash
hooks/useName.ts
hooks/useName.test.ts
```

### Rules:

- Name must start with use.
- One hook per file, named export.
- Hooks should have a single responsibility.
- Avoid useEffect if the effect can be resolved in render.
- useMemo / useCallback only if performance benefits.
- UI or Radix derived hooks must be separated and independent.
- **Never call setState synchronously inside useEffect** - this triggers cascading renders and will fail ESLint validation. Use lazy initialization in useState instead.

**Performance-critical hooks:**

For responsive behavior, always use existing optimized hooks:

```tsx
// ✅ Correct - uses matchMedia API
import { useMediaQuery } from '@/hooks/useMediaQuery'
const isMobile = !useMediaQuery(BREAKPOINTS.md)

// ✅ Correct - debounced window size
import { useWindowSize } from '@/hooks/useMediaQuery'
const { width, height } = useWindowSize(150) // 150ms debounce

// ❌ Wrong - creates performance issues
useEffect(() => {
  const handler = () => setWidth(window.innerWidth)
  window.addEventListener('resize', handler)
  return () => window.removeEventListener('resize', handler)
}, [])
```

### Hook testing

```ts
import { renderHook, act } from '@testing-library/react'
import { useCounter } from './useCounter'

test('increments counter', () => {
  const { result } = renderHook(() => useCounter())
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
})
```

- Test state and handlers, edge cases, and cleanup.
- Avoid inspecting `useEffect` or `useState` directly.

---

## 3. Server vs Client Components Guidelines

| Type | Use                                   | Hooks | Location                       |
| ---- | ------------------------------------- | ----- | ------------------------------ |
| SC   | Layouts, data fetching                | None  | `components/layout/` or `app/` |
| CC   | Visual UI components (Radix/Tailwind) | All   | `components/ui/...`            |

### Rules:

- All visual UI components → Client Component.
- SC can import CC; CC never import SC.
- Props: CC receives all data from SC.
- Keep CC purely visual.
- Performance: use React.memo if needed; SC benefits from SSR/SSG.

---

## 4. Testing Guidelines (Vitest + RTL)

### Location:

Tests next to the component or hook (_.spec.tsx or _.spec.ts).

### UI Components:

```ts
it('renders Button with text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
})
```

### Custom Hooks:

```ts
const { result } = renderHook(() => useCounter())
act(() => result.current.increment())
expect(result.current.count).toBe(1)
```

### Rules:

- Test visible behavior, not implementation details.
- Use roles and text instead of class selectors.
- Test variants, states, interactions.
- Mock only when necessary (vi.mock).

## 5. Git & PR Guidelines

```csharp
[type](TICKET-ID): short description
```

- type: `feat`, `fix`, `chore`, `refactor`, `test`, `docs`
- TICKET-ID required
- Clear description in present tense

### Pull Requests:

- Title: `[TICKET-ID] Concise description`
- Description: summary of changes, visual evidence, added tests.
- Required checks:
  - Unit tests added / existing pass
  - ESLint and Prettier pass
  - At least 1 reviewer completed

### Branching:

- `feature/TICKET-ID-description`
- `fix/TICKET-ID-description`
- `chore/TICKET-ID-description`

### Tips:

- Atomic commits
- Focused PR
- Visual evidence required for UI changes
- Reference ticket and documentation

## 6. Naming Conventions

Consistent naming is key for readability, maintainability, and a clean import experience.

### 📁 File & Folder Naming

| Type               | Convention                     | Example                                   | Notes                            |
| ------------------ | ------------------------------ | ----------------------------------------- | -------------------------------- |
| Components         | **PascalCase**                 | `Button.tsx`, `UserCard.tsx`              | Each component in its own folder |
| Hooks              | **camelCase**                  | `useFetch.ts`, `useScrollLock.ts`         | Must start with `use`            |
| Stylesheets        | **kebab-case**                 | `button.css`, `details-card.css`          | Matches component name           |
| Tests              | Match source + `.test.ts(x)`   | `Button.test.tsx`, `useFetch.test.ts`     | Placed next to the file tested   |
| Utility files      | **camelCase**                  | `formatCurrency.ts`, `getErrorMessage.ts` | No default exports               |
| Layouts / Pages    | **PascalCase folders**         | `Dashboard/`, `Settings/`                 | Next.js App Router convention    |
| Constants / Config | **UPPER_SNAKE_CASE file name** | `API_ROUTES.ts`, `ENV_CONFIG.ts`          | Exports constants only           |

**General Rules:**

- Avoid abbreviations (prefer `useScrollLock` over `useScrLk`).
- Folder names match the main exported symbol (`/Button/Button.tsx` exports `Button`).
- Keep index files minimal (`index.ts` only for re-exports).
- Tests and styles always live with their component or hook.

---

### 🧠 Code Naming Rules

**Components:**

- **PascalCase** for React components: `Button`, `UserProfileCard`.
- Exported symbol matches the file name exactly.
- One top-level component per file.
- Props interfaces start with the component name:
  ```ts
  interface ButtonProps { ... }
  export function Button({ variant }: ButtonProps) { ... }
  ```

**Functions & Variables:**

- **camelCase** for all regular functions and variables.
- **UPPER_SNAKE_CASE** only for constants that never change.

```ts
const MAX_ITEMS = 10
const apiUrl = getBaseUrl()
```

**Types & Interfaces:**

- **PascalCase**, never prefixed with I (✅ UserProps, ❌ IUserProps).
- Use type for unions and function signatures, interface for object shapes meant to be extended.

**Enums:**

- **PascalCase** for the enum, **UPPER_SNAKE_CASE** for values.

```ts
enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
```

**Files exporting multiple helpers:**

- Keep each export small, specific, and named.

```ts
// formatters.ts
export function formatCurrency(...) {}
export function formatDate(...) {}
```
