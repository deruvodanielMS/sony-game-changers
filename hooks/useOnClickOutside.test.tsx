import React from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { useOnClickOutside } from './useOnclickOutside'

function TestComponent({
  onOutside,
  options,
}: {
  onOutside: (e: any) => void
  options?: Parameters<typeof useOnClickOutside>[2]
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, onOutside, options)

  return (
    <div>
      <button data-testid="outside">Outside</button>

      <div ref={ref} data-testid="inside">
        Inside
      </div>
    </div>
  )
}

function TestWithAdditionalRef({ onOutside }: { onOutside: (e: any) => void }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const extraRef = React.useRef<HTMLButtonElement>(null)

  useOnClickOutside(ref, onOutside, {
    additionalRefs: [extraRef],
  })

  return (
    <div>
      <button ref={extraRef} data-testid="extra">
        Extra
      </button>

      <button data-testid="outside">Outside</button>

      <div ref={ref} data-testid="inside">
        Inside
      </div>
    </div>
  )
}

describe('useOnClickOutside', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('calls onOutside when clicking outside', () => {
    const onOutside = vi.fn()

    const { getByTestId } = render(<TestComponent onOutside={onOutside} />)

    fireEvent.pointerDown(getByTestId('outside'))

    expect(onOutside).toHaveBeenCalledTimes(1)
  })

  it('does not call onOutside when clicking inside', () => {
    const onOutside = vi.fn()

    const { getByTestId } = render(<TestComponent onOutside={onOutside} />)

    fireEvent.pointerDown(getByTestId('inside'))

    expect(onOutside).not.toHaveBeenCalled()
  })

  it('does not call onOutside when clicking an additionalRef', () => {
    const onOutside = vi.fn()

    const { getByTestId } = render(<TestWithAdditionalRef onOutside={onOutside} />)

    fireEvent.pointerDown(getByTestId('extra'))

    expect(onOutside).not.toHaveBeenCalled()
  })

  it('ignores events matching ignoreSelector', () => {
    const onOutside = vi.fn()

    const {} = render(
      <TestComponent onOutside={onOutside} options={{ ignoreSelector: '[data-ignore]' }} />,
    )

    const ignored = document.createElement('button')
    ignored.setAttribute('data-ignore', 'true')
    document.body.appendChild(ignored)

    fireEvent.pointerDown(ignored)

    expect(onOutside).not.toHaveBeenCalled()

    document.body.removeChild(ignored)
  })

  it('listens to multiple event types', () => {
    const onOutside = vi.fn()

    const { getByTestId } = render(
      <TestComponent onOutside={onOutside} options={{ events: ['mousedown', 'touchstart'] }} />,
    )

    fireEvent.mouseDown(getByTestId('outside'))
    fireEvent.touchStart(getByTestId('outside'))

    expect(onOutside).toHaveBeenCalledTimes(2)
  })

  it('uses the latest onOutside callback', () => {
    const first = vi.fn()
    const second = vi.fn()

    const { rerender, getByTestId } = render(<TestComponent onOutside={first} />)

    rerender(<TestComponent onOutside={second} />)

    fireEvent.pointerDown(getByTestId('outside'))

    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledTimes(1)
  })

  it('removes event listeners on unmount', () => {
    const onOutside = vi.fn()

    const addSpy = vi.spyOn(document, 'addEventListener')
    const removeSpy = vi.spyOn(document, 'removeEventListener')

    const { unmount } = render(<TestComponent onOutside={onOutside} />)

    expect(addSpy).toHaveBeenCalled()

    unmount()

    expect(removeSpy).toHaveBeenCalled()
  })
})
