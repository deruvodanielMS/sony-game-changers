# Storybook Story Creation Guide

## 📁 Component Structure

```
components/ui/button/
├── button.tsx
└── button.stories.tsx
```

## 🎯 Story Template

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { YourComponent } from './your-component'

const meta: Meta<typeof YourComponent> = {
  title: 'UI/YourComponent',
  component: YourComponent,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
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
  render: () => (
    <div className="flex gap-4">
      <YourComponent variant="default">Default</YourComponent>
      <YourComponent variant="secondary">Secondary</YourComponent>
    </div>
  ),
}
```

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

- **Files**: `component-name.stories.tsx`
- **Titles**: `UI/ComponentName`, `Molecules/ComponentName`
- **Stories**: `PascalCase` (Default, AllVariants, WithIcon)

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
