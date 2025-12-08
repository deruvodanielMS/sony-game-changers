import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from './Modal'
import { ModalHeader } from './ModalHeader'
import { ModalBody } from './ModalBody'
import { ModalFooter } from './ModalFooter'
import translations from '@/messages/en.json'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    return (translations.MobileHeader as Record<string, string>)[key] || key
  },
}))

describe('Modal (wrapper + parts)', () => {
  it('renders when open=true and not when open=false', async () => {
    const { rerender } = render(
      <Modal open={true} onClose={() => {}}>
        <ModalHeader>Title</ModalHeader>
        <ModalBody>Body</ModalBody>
      </Modal>,
    )
    expect(screen.queryByRole('dialog')).toBeInTheDocument()

    rerender(
      <Modal open={false} onClose={() => {}}>
        <ModalHeader>Title</ModalHeader>
        <ModalBody>Body</ModalBody>
      </Modal>,
    )
    waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('calls onClose on overlay click when overlayClose=true', async () => {
    const onClose = vi.fn()
    render(
      <Modal open={true} onClose={onClose} overlayClose={true}>
        <ModalHeader>Title</ModalHeader>
      </Modal>,
    )
    const overlay = screen.getByTestId('modal-overlay')
    await userEvent.click(overlay)
    expect(onClose).toHaveBeenCalled()
  })

  it('does not call onClose on overlay click when overlayClose=false', async () => {
    const onClose = vi.fn()
    render(
      <Modal open={true} onClose={onClose} overlayClose={false}>
        <ModalHeader>Title</ModalHeader>
      </Modal>,
    )
    const overlay = screen.getByTestId('modal-overlay')
    await userEvent.click(overlay)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('calls onClose on Escape key', () => {
    const onClose = vi.fn()
    render(
      <Modal open={true} onClose={onClose}>
        <ModalHeader>Title</ModalHeader>
      </Modal>,
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
      <Modal open={true} onClose={onClose}>
        <ModalHeader>Title</ModalHeader>
        <ModalBody>
          <button>Inside</button>
        </ModalBody>
      </Modal>,
    )

    rerender(
      <Modal open={false} onClose={onClose}>
        <ModalHeader>Title</ModalHeader>
      </Modal>,
    )

    expect(document.activeElement).toBe(trigger)
    document.body.removeChild(trigger)
  })

  it('applies size variants to container', () => {
    const { rerender } = render(
      <Modal open={true} onClose={() => {}} size="sm">
        <ModalHeader>Title</ModalHeader>
      </Modal>,
    )
    const container = screen.getByTestId('modal-container')
    expect(container.className).toContain('max-w-modal-sm')

    rerender(
      <Modal open={true} onClose={() => {}} size="full">
        <ModalHeader>Title</ModalHeader>
      </Modal>,
    )
    expect(container.className).toContain('w-full')
  })

  it('calls onClose when header close button is clicked', async () => {
    const onClose = vi.fn()
    render(
      <Modal open={true} onClose={onClose}>
        <ModalHeader onClose={onClose}>Title</ModalHeader>
      </Modal>,
    )

    const closeButton = screen.getByRole('button', { name: /close/i })
    await userEvent.click(closeButton)
    expect(onClose).toHaveBeenCalled()
  })

  it('renders ModalFooter with provided className and children inside container', () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <ModalHeader>Title</ModalHeader>
        <ModalBody>Body</ModalBody>
        <ModalFooter className="test-footer-class" />
      </Modal>,
    )

    const container = screen.getByTestId('modal-container')
    const footer = container.querySelector('footer') as HTMLElement | null
    expect(footer).toBeInTheDocument()
    expect(footer?.className).toContain('test-footer-class')
  })
})
