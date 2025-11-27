import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Drawer } from './Drawer'

describe('Drawer', () => {
  it('renders when open=true and not when open=false', () => {
    const { rerender } = render(
      <Drawer open={true} onClose={() => {}} title="Test Drawer">
        Body content
      </Drawer>,
    )
    expect(screen.queryByRole('dialog')).toBeInTheDocument()

    rerender(
      <Drawer open={false} onClose={() => {}} title="Test Drawer">
        Body content
      </Drawer>,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('calls onClose on overlay click when overlayClose=true', async () => {
    const onClose = vi.fn()
    render(
      <Drawer open={true} onClose={onClose} overlayClose={true} title="Test">
        Content
      </Drawer>,
    )
    const overlay = screen.getByTestId('drawer-overlay')
    await userEvent.click(overlay)
    expect(onClose).toHaveBeenCalled()
  })

  it('does not call onClose on overlay click when overlayClose=false', async () => {
    const onClose = vi.fn()
    render(
      <Drawer open={true} onClose={onClose} overlayClose={false} title="Test">
        Content
      </Drawer>,
    )
    const overlay = screen.getByTestId('drawer-overlay')
    await userEvent.click(overlay)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('calls onClose on Escape key', () => {
    const onClose = vi.fn()
    render(
      <Drawer open={true} onClose={onClose} title="Test">
        Content
      </Drawer>,
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalled()
  })

  it('returns focus to trigger after close', async () => {
    const onClose = vi.fn()
    const trigger = document.createElement('button')
    trigger.textContent = 'Open'
    document.body.appendChild(trigger)
    trigger.focus()

    const { rerender } = render(
      <Drawer open={true} onClose={onClose} title="Test">
        <button>Inside</button>
      </Drawer>,
    )

    rerender(
      <Drawer open={false} onClose={onClose} title="Test">
        <button>Inside</button>
      </Drawer>,
    )

    expect(document.activeElement).toBe(trigger)
    document.body.removeChild(trigger)
  })

  it('applies position variants', () => {
    const { rerender } = render(
      <Drawer open={true} onClose={() => {}} position="left" title="Test">
        Content
      </Drawer>,
    )
    let container = screen.getByTestId('drawer-container')
    expect(container.className).toContain('left-0')

    rerender(
      <Drawer open={true} onClose={() => {}} position="right" title="Test">
        Content
      </Drawer>,
    )
    container = screen.getByTestId('drawer-container')
    expect(container.className).toContain('right-0')

    rerender(
      <Drawer open={true} onClose={() => {}} position="top" title="Test">
        Content
      </Drawer>,
    )
    container = screen.getByTestId('drawer-container')
    expect(container.className).toContain('top-0')

    rerender(
      <Drawer open={true} onClose={() => {}} position="bottom" title="Test">
        Content
      </Drawer>,
    )
    container = screen.getByTestId('drawer-container')
    expect(container.className).toContain('bottom-0')
  })

  it('applies size variants for horizontal drawers', () => {
    const { rerender } = render(
      <Drawer open={true} onClose={() => {}} position="right" size="sm" title="Test">
        Content
      </Drawer>,
    )
    let container = screen.getByTestId('drawer-container')
    expect(container.className).toContain('w-drawer-width-sm')

    rerender(
      <Drawer open={true} onClose={() => {}} position="right" size="md" title="Test">
        Content
      </Drawer>,
    )
    container = screen.getByTestId('drawer-container')
    expect(container.className).toContain('w-drawer-width-md')

    rerender(
      <Drawer open={true} onClose={() => {}} position="right" size="lg" title="Test">
        Content
      </Drawer>,
    )
    container = screen.getByTestId('drawer-container')
    expect(container.className).toContain('w-drawer-width-lg')

    rerender(
      <Drawer open={true} onClose={() => {}} position="right" size="full" title="Test">
        Content
      </Drawer>,
    )
    container = screen.getByTestId('drawer-container')
    expect(container.className).toContain('w-full')
  })

  it('applies size variants for vertical drawers', () => {
    const { rerender } = render(
      <Drawer open={true} onClose={() => {}} position="top" size="sm" title="Test">
        Content
      </Drawer>,
    )
    let container = screen.getByTestId('drawer-container')
    expect(container.className).toContain('h-drawer-height-sm')

    rerender(
      <Drawer open={true} onClose={() => {}} position="top" size="md" title="Test">
        Content
      </Drawer>,
    )
    container = screen.getByTestId('drawer-container')
    expect(container.className).toContain('h-drawer-height-md')

    rerender(
      <Drawer open={true} onClose={() => {}} position="top" size="lg" title="Test">
        Content
      </Drawer>,
    )
    container = screen.getByTestId('drawer-container')
    expect(container.className).toContain('h-drawer-height-lg')
  })

  it('applies custom className', () => {
    render(
      <Drawer open={true} onClose={() => {}} className="custom-drawer" title="Test">
        Content
      </Drawer>,
    )
    const container = screen.getByTestId('drawer-container')
    expect(container.className).toContain('custom-drawer')
  })

  it('applies custom aria-label', () => {
    render(
      <Drawer open={true} onClose={() => {}} aria-label="Custom drawer">
        Content
      </Drawer>,
    )
    expect(screen.getByRole('dialog', { name: 'Custom drawer' })).toBeInTheDocument()
  })

  it('uses title as aria-label when not provided', () => {
    render(
      <Drawer open={true} onClose={() => {}} title="My Drawer">
        Content
      </Drawer>,
    )
    expect(screen.getByRole('dialog', { name: 'My Drawer' })).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(
      <Drawer open={true} onClose={() => {}} title="Drawer Title">
        Content
      </Drawer>,
    )
    expect(screen.getByText('Drawer Title')).toBeInTheDocument()
  })

  it('renders close button when showClose=true and title provided', () => {
    render(
      <Drawer open={true} onClose={() => {}} showClose={true} title="Test">
        Content
      </Drawer>,
    )
    expect(screen.getByTestId('drawer-close-button')).toBeInTheDocument()
  })

  it('does not render close button when showClose=false', () => {
    render(
      <Drawer open={true} onClose={() => {}} showClose={false} title="Test">
        Content
      </Drawer>,
    )
    expect(screen.queryByTestId('drawer-close-button')).not.toBeInTheDocument()
  })

  it('calls onClose when close button clicked', async () => {
    const onClose = vi.fn()
    render(
      <Drawer open={true} onClose={onClose} showClose={true} title="Test">
        Content
      </Drawer>,
    )
    await userEvent.click(screen.getByTestId('drawer-close-button'))
    expect(onClose).toHaveBeenCalled()
  })

  it('renders actions in footer', () => {
    render(
      <Drawer open={true} onClose={() => {}} title="Test" actions={<button>Action Button</button>}>
        Content
      </Drawer>,
    )
    expect(screen.getByText('Action Button')).toBeInTheDocument()
    expect(screen.getByTestId('drawer-footer')).toBeInTheDocument()
  })

  it('does not render footer when no actions provided', () => {
    render(
      <Drawer open={true} onClose={() => {}} title="Test">
        Content
      </Drawer>,
    )
    expect(screen.queryByTestId('drawer-footer')).not.toBeInTheDocument()
  })

  it('renders body content', () => {
    render(
      <Drawer open={true} onClose={() => {}} title="Test">
        <p>Body content here</p>
      </Drawer>,
    )
    expect(screen.getByText('Body content here')).toBeInTheDocument()
    expect(screen.getByTestId('drawer-body')).toBeInTheDocument()
  })

  it('renders mobile handle for bottom position', () => {
    render(
      <Drawer open={true} onClose={() => {}} position="bottom" title="Test">
        Content
      </Drawer>,
    )
    const container = screen.getByTestId('drawer-container')
    const handle = container.querySelector('.w-4.h-0\\.25')
    expect(handle).toBeInTheDocument()
  })

  it('forwards data-test-id to wrapper', () => {
    render(
      <Drawer open={true} onClose={() => {}} title="Test" data-test-id="my-drawer">
        Content
      </Drawer>,
    )
    const overlay = screen.getByTestId('drawer-overlay')
    expect(overlay).toHaveAttribute('data-test-id', 'my-drawer')
  })
})

describe('Drawer Snapshots', () => {
  it('matches snapshot - default right position', () => {
    render(
      <Drawer open={true} onClose={() => {}} title="Snapshot Test">
        <p>Test content</p>
      </Drawer>,
    )
    const drawer = screen.getByTestId('drawer-container')
    expect(drawer).toMatchSnapshot()
  })

  it('matches snapshot - left position with actions', () => {
    render(
      <Drawer
        open={true}
        onClose={() => {}}
        position="left"
        title="Left Drawer"
        actions={<button>Action</button>}
      >
        <p>Content</p>
      </Drawer>,
    )
    const drawer = screen.getByTestId('drawer-container')
    expect(drawer).toMatchSnapshot()
  })

  it('matches snapshot - bottom position mobile sheet', () => {
    render(
      <Drawer
        open={true}
        onClose={() => {}}
        position="bottom"
        title="Bottom Sheet"
        hideCloseOnMobile={true}
      >
        <p>Mobile content</p>
      </Drawer>,
    )
    const drawer = screen.getByTestId('drawer-container')
    expect(drawer).toMatchSnapshot()
  })

  it('matches snapshot - large size without title', () => {
    render(
      <Drawer open={true} onClose={() => {}} size="lg" showClose={false}>
        <p>No title drawer</p>
      </Drawer>,
    )
    const drawer = screen.getByTestId('drawer-container')
    expect(drawer).toMatchSnapshot()
  })
})
