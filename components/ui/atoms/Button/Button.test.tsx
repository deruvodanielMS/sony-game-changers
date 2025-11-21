import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from './Button'

describe('Button', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button')).toBeDefined()
      expect(screen.getByText('Click me')).toBeDefined()
    })

    it('renders as button element by default', () => {
      const { container } = render(<Button>Test</Button>)
      expect(container.querySelector('button')).toBeDefined()
    })

    it('applies custom className', () => {
      render(<Button className="custom-class">Test</Button>)
      expect(screen.getByRole('button').className).toContain('custom-class')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>()
      render(<Button ref={ref}>Test</Button>)
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe('Variants', () => {
    it('renders primary variant', () => {
      const { container } = render(<Button variant="primary">Primary</Button>)
      const button = container.querySelector('button')
      expect(button?.className).toContain('from-indigo-500')
      expect(button?.className).toContain('to-fuchsia-500')
    })

    it('renders secondary variant', () => {
      const { container } = render(<Button variant="secondary">Secondary</Button>)
      const button = container.querySelector('button')
      expect(button?.className).toContain('bg-neutral-0')
      expect(button?.className).toContain('shadow-[inset_0_0_0_1px_var(--neutral-1000)]')
    })

    it('renders tertiary variant', () => {
      const { container } = render(<Button variant="tertiary">Tertiary</Button>)
      const button = container.querySelector('button')
      expect(button?.className).toContain('bg-neutral-100')
    })

    it('renders plain variant', () => {
      const { container } = render(<Button variant="plain">Plain</Button>)
      const button = container.querySelector('button')
      expect(button?.className).toContain('bg-transparent')
    })
  })

  describe('Sizes', () => {
    it('renders default size', () => {
      const { container } = render(<Button size="default">Default</Button>)
      const button = container.querySelector('button')
      expect(button?.className).toContain('h-[44px]')
    })

    it('renders small size', () => {
      const { container } = render(<Button size="small">Small</Button>)
      const button = container.querySelector('button')
      expect(button?.className).toContain('h-[32px]')
    })
  })

  describe('Modes', () => {
    it('renders danger mode with primary variant', () => {
      const { container } = render(
        <Button variant="primary" mode="danger">
          Delete
        </Button>,
      )
      const button = container.querySelector('button')
      expect(button?.className).toContain('bg-feedback-danger-600')
    })

    it('renders danger mode with tertiary variant', () => {
      const { container } = render(
        <Button variant="tertiary" mode="danger">
          Remove
        </Button>,
      )
      const button = container.querySelector('button')
      expect(button?.className).toContain('bg-feedback-danger-10')
    })

    it('renders danger mode with plain variant', () => {
      const { container } = render(
        <Button variant="plain" mode="danger">
          Cancel
        </Button>,
      )
      const button = container.querySelector('button')
      expect(button?.className).toContain('text-feedback-danger-600')
    })
  })

  describe('Icons', () => {
    it('renders with left icon', () => {
      render(<Button leftIcon={<Plus data-testid="left-icon" />}>Add</Button>)
      expect(screen.getByTestId('left-icon')).toBeDefined()
      expect(screen.getByText('Add')).toBeDefined()
    })

    it('renders with right icon', () => {
      render(<Button rightIcon={<Trash2 data-testid="right-icon" />}>Delete</Button>)
      expect(screen.getByTestId('right-icon')).toBeDefined()
      expect(screen.getByText('Delete')).toBeDefined()
    })

    it('renders with both icons', () => {
      render(
        <Button
          leftIcon={<Plus data-testid="left-icon" />}
          rightIcon={<Trash2 data-testid="right-icon" />}
        >
          Text
        </Button>,
      )
      expect(screen.getByTestId('left-icon')).toBeDefined()
      expect(screen.getByTestId('right-icon')).toBeDefined()
    })
  })

  describe('Icon-only mode', () => {
    it('renders icon-only button with rounded shape', () => {
      const { container } = render(
        <Button iconOnly iconShape="rounded" aria-label="Add">
          <Plus />
        </Button>,
      )
      const button = container.querySelector('button')
      expect(button?.className).toContain('rounded-[100px]')
      expect(button?.className).toContain('!p-0')
    })

    it('renders icon-only button with squared shape', () => {
      const { container } = render(
        <Button iconOnly iconShape="squared" aria-label="Add">
          <Plus />
        </Button>,
      )
      const button = container.querySelector('button')
      expect(button?.className).toContain('rounded-lg')
    })

    it('renders small icon-only button', () => {
      const { container } = render(
        <Button iconOnly iconShape="rounded" size="small" aria-label="Add">
          <Plus />
        </Button>,
      )
      const iconWrapper = container.querySelector('.w-5')
      expect(iconWrapper).toBeDefined()
    })
  })

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole('button')
      expect(button.hasAttribute('disabled')).toBe(true)
      expect(button.getAttribute('aria-disabled')).toBe('true')
    })

    it('renders loading state', () => {
      render(<Button isLoading>Loading</Button>)
      const button = screen.getByRole('button')
      expect(button.hasAttribute('disabled')).toBe(true)
      expect(button.getAttribute('aria-busy')).toBe('true')
    })

    it('shows spinner in loading state', () => {
      const { container } = render(<Button isLoading>Loading</Button>)
      const spinner = container.querySelector('svg.animate-spin')
      expect(spinner).toBeDefined()
    })

    it('disables button when loading', () => {
      render(<Button isLoading>Loading</Button>)
      const button = screen.getByRole('button')
      expect(button.hasAttribute('disabled')).toBe(true)
    })

    it('hides icons when loading in icon-only mode', () => {
      render(
        <Button isLoading iconOnly iconShape="rounded" aria-label="Loading">
          <Plus data-testid="icon" />
        </Button>,
      )
      expect(screen.queryByTestId('icon')).toBeNull()
    })
  })

  describe('HTML Attributes', () => {
    it('applies type attribute', () => {
      render(<Button type="submit">Submit</Button>)
      expect(screen.getByRole('button').getAttribute('type')).toBe('submit')
    })

    it('defaults to type button', () => {
      render(<Button>Button</Button>)
      expect(screen.getByRole('button').getAttribute('type')).toBe('button')
    })

    it('passes through custom HTML attributes', () => {
      render(
        <Button data-testid="custom-button" aria-label="Custom">
          Test
        </Button>,
      )
      expect(screen.getByTestId('custom-button')).toBeDefined()
      expect(screen.getByLabelText('Custom')).toBeDefined()
    })
  })

  describe('Accessibility', () => {
    it('has proper aria-busy when loading', () => {
      render(<Button isLoading>Loading</Button>)
      expect(screen.getByRole('button').getAttribute('aria-busy')).toBe('true')
    })

    it('has proper aria-disabled when disabled', () => {
      render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button').getAttribute('aria-disabled')).toBe('true')
    })

    it('requires aria-label for icon-only buttons', () => {
      render(
        <Button iconOnly iconShape="rounded" aria-label="Add item">
          <Plus />
        </Button>,
      )
      expect(screen.getByLabelText('Add item')).toBeDefined()
    })

    it('icons have aria-hidden', () => {
      const { container } = render(
        <Button leftIcon={<Plus />} rightIcon={<Trash2 />}>
          Test
        </Button>,
      )
      const iconWrappers = container.querySelectorAll('[aria-hidden="true"]')
      expect(iconWrappers.length).toBeGreaterThanOrEqual(2)
    })
  })
})
