# 🚀 Sony Gamechangers – Code Style & Guidelines

**Stack:** Next.js (App Router) · Client Components · TypeScript · Tailwind · Radix Primitives · Vitest

---

## 1. UI Components Base Guidelines

**Location:**

```text
components/ui/[ComponentName]/
[Component].tsx
[Component].test.tsx
[Component].stories.tsx
```

---

**Conventions:**

- `use client` always at the top of visual components.
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

### Radix Primitives:

- Never use primitives directly in pages; always wrap them.
- Use asChild when possible.
- Visual styles in .css file.

### Performance:

- Avoid useEffect unless for real side effects.
- useMemo and useCallback only when they reduce renders.
- Keep local UI state only if necessary for visual interaction.

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
