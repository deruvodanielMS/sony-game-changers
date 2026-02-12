import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pencil, Archive } from 'lucide-react'
import { DropdownMenu } from './DropdownMenu'

describe('DropdownMenu', () => {
  const defaultItems = [
    { label: 'Edit', icon: <Pencil data-testid="edit-icon" />, onClick: vi.fn() },
    { label: 'Archive', icon: <Archive data-testid="archive-icon" />, onClick: vi.fn() },
  ]

  it('renders trigger element', () => {
    render(
      <DropdownMenu
        trigger={<button data-testid="trigger">Open Menu</button>}
        items={defaultItems}
      />,
    )
    expect(screen.getByTestId('trigger')).toBeInTheDocument()
  })

  it('opens dropdown when trigger is clicked', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu
        trigger={<button data-testid="trigger">Open Menu</button>}
        items={defaultItems}
      />,
    )

    await user.click(screen.getByTestId('trigger'))

    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Archive')).toBeInTheDocument()
  })

  it('renders menu items with icons', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu
        trigger={<button data-testid="trigger">Open Menu</button>}
        items={defaultItems}
      />,
    )

    await user.click(screen.getByTestId('trigger'))

    expect(screen.getByTestId('edit-icon')).toBeInTheDocument()
    expect(screen.getByTestId('archive-icon')).toBeInTheDocument()
  })

  it('calls onClick when menu item is selected', async () => {
    const user = userEvent.setup()
    const onEditClick = vi.fn()
    const items = [{ label: 'Edit', onClick: onEditClick }]

    render(
      <DropdownMenu trigger={<button data-testid="trigger">Open Menu</button>} items={items} />,
    )

    await user.click(screen.getByTestId('trigger'))
    await user.click(screen.getByText('Edit'))

    expect(onEditClick).toHaveBeenCalledTimes(1)
  })

  it('renders disabled items correctly', async () => {
    const user = userEvent.setup()
    const items = [{ label: 'Disabled Item', onClick: vi.fn(), disabled: true }]

    render(
      <DropdownMenu trigger={<button data-testid="trigger">Open Menu</button>} items={items} />,
    )

    await user.click(screen.getByTestId('trigger'))
    const disabledItem = screen.getByText('Disabled Item')

    expect(disabledItem.closest('[data-disabled]')).toBeInTheDocument()
  })

  it('applies danger variant styling', async () => {
    const user = userEvent.setup()
    const items = [{ label: 'Delete', onClick: vi.fn(), variant: 'danger' as const }]

    render(
      <DropdownMenu trigger={<button data-testid="trigger">Open Menu</button>} items={items} />,
    )

    await user.click(screen.getByTestId('trigger'))
    const dangerItem = screen.getByText('Delete')

    expect(dangerItem.closest('[role="menuitem"]')).toHaveClass('text-feedback-error-500')
  })

  it('applies data-test-id to trigger', () => {
    render(
      <DropdownMenu
        trigger={<button>Open Menu</button>}
        items={defaultItems}
        data-test-id="dropdown-menu"
      />,
    )

    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument()
  })
})
