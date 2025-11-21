# Storybook Story Creation Guide

## 📁 Component Structure (Atomic Design)

Components are organized following Atomic Design principles:

```
components/ui/
├── foundations/        # Design system fundamentals
│   ├── Typography/
│   │   ├── Typography.tsx
│   │   ├── Typography.test.tsx
│   │   ├── Typography.stories.tsx
│   │   ├── Typography.constants.ts
│   │   └── index.ts
│   └── ColorTokens/
│       └── ColorTokens.stories.tsx
├── atoms/              # Basic building blocks
│   └── Button/
│       ├── Button.tsx
│       ├── Button.test.tsx
│       ├── Button.stories.tsx
│       ├── Button.types.ts
│       └── index.tsx
├── molecules/          # Composite components
│   └── FormControl/
│       ├── FormControl.tsx
│       ├── FormControl.test.tsx
│       ├── FormControl.stories.tsx
│       ├── FormControl.types.ts
│       └── index.tsx
└── organisms/          # Complex components
```

**Note**: All component files and folders use PascalCase naming.

## 🎯 Story Template

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { YourComponent } from './YourComponent'

const meta: Meta<typeof YourComponent> = {
  title: 'Atoms/YourComponent',  // Use Atomic Design categories
  component: YourComponent,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },  // Automatic action tracking
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Example' },
}

export const AllVariants: Story = {
  render: () => (  // No args parameter needed for action tracking
    <div className="flex gap-4">
      <YourComponent variant="default">Default</YourComponent>
      <YourComponent variant="secondary">Secondary</YourComponent>
    </div>
  ),
}
```

## 📚 Storybook Organization (Atomic Design)

Stories are organized in Storybook using Atomic Design categories:

### Foundations/

Design system fundamentals that aren't components themselves:

- **ColorTokens** - Color palette and design tokens
- **Typography** - Type system and text styles
- **Spacing** - Spacing scale
- **Icons** - Icon library

### Atoms/

Basic building blocks - smallest functional components:

- **Button** - Interactive buttons
- **Input** - Text inputs
- **Label** - Form labels
- **Badge** - Status indicators

### Molecules/

Composite components combining multiple atoms:

- **FormControl** - Label + Input + Helper text
- **SearchBar** - Input + Button
- **Card** - Container with multiple elements

### Organisms/

Complex components with multiple molecules/atoms:

- **Header** - Navigation with logo, menu, buttons
- **Form** - Multiple form controls
- **DataTable** - Complex table with sorting, filtering

### How to Categorize Your Component

1. **Foundations** - Is it a design token, color palette, or typography system?
   - ✅ Use `title: 'Foundations/ComponentName'`
2. **Atom** - Is it a single-purpose, indivisible component?
   - ✅ Use `title: 'Atoms/ComponentName'`
3. **Molecule** - Does it combine 2-3 atoms into a functional group?
   - ✅ Use `title: 'Molecules/ComponentName'`
4. **Organism** - Does it contain multiple molecules/atoms and represent a major UI section?
   - ✅ Use `title: 'Organisms/ComponentName'`

## 📋 Required Stories

- ✅ `Default` - Basic usage
- ✅ `AllVariants` - All visual variants
- ✅ `Disabled` - Disabled state (if applicable)
- ✅ `Playground` - Interactive controls

## 🎨 Design Patterns

### Use CVA for Variants

```typescript
const buttonVariants = cva('inline-flex items-center justify-center rounded-md', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
})
```

### Use Radix for Interactive Components

```typescript
import { Slot } from '@radix-ui/react-slot'

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = ({ asChild = false, ...props }) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp {...props} />
}
```

## ♿ Accessibility

### Required Controls

```typescript
argTypes: {
  'aria-label': {
    control: 'text',
    description: 'Accessible label',
  },
  disabled: {
    control: 'boolean',
    description: 'Disabled state',
  },
}
```

### A11y Story

```typescript
export const WithAriaLabel: Story = {
  args: {
    'aria-label': 'Close dialog',
    children: '×',
  },
}
```

## 📖 Naming Conventions

- **Folders**: `PascalCase` (Button/, Typography/, FormControl/)
- **Files**: `PascalCase.extension` (Button.tsx, Button.stories.tsx, Button.test.tsx)
- **Story Titles**: Follow Atomic Design categories
  - `'Foundations/ColorTokens'`
  - `'Atoms/Button'`
  - `'Molecules/FormControl'`
  - `'Organisms/Header'`
- **Story Names**: `PascalCase` (Default, AllVariants, WithIcon, DangerMode)

## 🎬 Action Tracking in Storybook

Storybook automatically tracks events when defined in `argTypes`:

```typescript
const meta: Meta<typeof Button> = {
  argTypes: {
    onClick: { action: 'clicked' }, // Automatically logs clicks
    onChange: { action: 'changed' }, // Automatically logs changes
    onSubmit: { action: 'submitted' }, // Automatically logs submits
  },
}
```

**Important**: Don't pass `args.onClick` explicitly in story render functions:

```typescript
// ❌ WRONG - Will fire actions twice
export const MyStory: Story = {
  render: (args) => <Button onClick={args.onClick}>Click me</Button>
}

// ✅ CORRECT - argTypes definition is enough
export const MyStory: Story = {
  render: () => <Button>Click me</Button>
}
```

The `onClick: { action: 'clicked' }` in argTypes automatically instruments the component's onClick events and logs them to the Actions panel.

## 🧪 Testing Scenarios

```typescript
export const Loading: Story = {
  args: { loading: true },
}

export const Error: Story = {
  args: { error: 'Something went wrong' },
}

export const WithLongText: Story = {
  args: { children: 'This is a very long text to test overflow behavior' },
}
```

## 🎯 Quick Checklist

- [ ] Component uses Tailwind classes
- [ ] All variants have stories
- [ ] A11y addon shows no violations
- [ ] Controls are properly configured
- [ ] Responsive behavior tested
- [ ] Documentation strings added
