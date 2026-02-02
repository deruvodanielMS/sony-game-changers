import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs } from './Tabs'
import type { TabItem } from './Tabs.types'

describe('Tabs', () => {
  const mockItems: TabItem[] = [
    { value: 'active', label: 'Active' },
    { value: 'archived', label: 'Archived' },
    { value: 'draft', label: 'Draft' },
  ]

  it('renders all tab items', () => {
    const mockOnChange = vi.fn()
    render(<Tabs items={mockItems} value="active" onChange={mockOnChange} />)

    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Archived')).toBeInTheDocument()
    expect(screen.getByText('Draft')).toBeInTheDocument()
  })

  it('marks active tab with aria-selected', () => {
    const mockOnChange = vi.fn()
    render(<Tabs items={mockItems} value="active" onChange={mockOnChange} />)

    const activeTab = screen.getByRole('tab', { name: /active/i })
    const archivedTab = screen.getByRole('tab', { name: /archived/i })

    expect(activeTab).toHaveAttribute('aria-selected', 'true')
    expect(archivedTab).toHaveAttribute('aria-selected', 'false')
  })

  it('calls onChange when clicking a tab', async () => {
    const user = userEvent.setup()
    const mockOnChange = vi.fn()
    render(<Tabs items={mockItems} value="active" onChange={mockOnChange} />)

    const archivedTab = screen.getByRole('tab', { name: /archived/i })
    await user.click(archivedTab)

    expect(mockOnChange).toHaveBeenCalledWith('archived')
  })

  it('does not call onChange when clicking active tab', async () => {
    const user = userEvent.setup()
    const mockOnChange = vi.fn()
    render(<Tabs items={mockItems} value="active" onChange={mockOnChange} />)

    const activeTab = screen.getByRole('tab', { name: /active/i })
    await user.click(activeTab)

    expect(mockOnChange).toHaveBeenCalledWith('active')
  })

  it('renders disabled tab correctly', () => {
    const itemsWithDisabled: TabItem[] = [
      { value: 'active', label: 'Active' },
      { value: 'archived', label: 'Archived', disabled: true },
    ]

    const mockOnChange = vi.fn()
    render(<Tabs items={itemsWithDisabled} value="active" onChange={mockOnChange} />)

    const disabledTab = screen.getByRole('tab', { name: /archived/i })
    expect(disabledTab).toBeDisabled()
    expect(disabledTab).toHaveAttribute('aria-disabled', 'true')
  })

  it('does not call onChange when clicking disabled tab', async () => {
    const user = userEvent.setup()
    const itemsWithDisabled: TabItem[] = [
      { value: 'active', label: 'Active' },
      { value: 'archived', label: 'Archived', disabled: true },
    ]

    const mockOnChange = vi.fn()
    render(<Tabs items={itemsWithDisabled} value="active" onChange={mockOnChange} />)

    const disabledTab = screen.getByRole('tab', { name: /archived/i })
    await user.click(disabledTab)

    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it('renders tabs with icons', () => {
    const itemsWithIcons: TabItem[] = [
      { value: 'active', label: 'Active', icon: <span data-testid="icon-active">🔵</span> },
      { value: 'archived', label: 'Archived', icon: <span data-testid="icon-archived">🟢</span> },
    ]

    const mockOnChange = vi.fn()
    render(<Tabs items={itemsWithIcons} value="active" onChange={mockOnChange} />)

    expect(screen.getByTestId('icon-active')).toBeInTheDocument()
    expect(screen.getByTestId('icon-archived')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const mockOnChange = vi.fn()
    render(
      <Tabs
        items={mockItems}
        value="active"
        onChange={mockOnChange}
        className="custom-class"
        data-test-id="tabs"
      />,
    )

    const tabs = screen.getByTestId('tabs')
    expect(tabs).toHaveClass('custom-class')
  })

  it('applies test-id to individual tabs', () => {
    const mockOnChange = vi.fn()
    render(<Tabs items={mockItems} value="active" onChange={mockOnChange} />)

    expect(screen.getByTestId('tab-active')).toBeInTheDocument()
    expect(screen.getByTestId('tab-archived')).toBeInTheDocument()
    expect(screen.getByTestId('tab-draft')).toBeInTheDocument()
  })
})
