import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FormControl } from './FormControl'
import { HELPER_TYPE } from './FormControl.types'

vi.mock('radix-ui', () => ({
  Label: {
    Root: ({ children }: { children: React.ReactNode }) => <label>{children}</label>,
  },
}))

vi.mock('lucide-react', () => ({
  Info: () => <svg data-testid="icon-info" />,
  X: () => <svg data-testid="icon-x" />,
  Check: () => <svg data-testid="icon-check" />,
  AlertCircle: () => <svg data-testid="icon-alert" />,
}))

describe('FeedBackHelper inside FormControl', () => {
  it('renders the message correctly', () => {
    render(
      <FormControl
        label="Email"
        helperBefore={[{ type: HELPER_TYPE.INFO, message: 'Useful information' }]}
      >
        <input type="text" />
      </FormControl>,
    )

    expect(screen.getByText('Useful information')).toBeInTheDocument()
  })

  it('shows the correct icon for each type', () => {
    const helpers = Object.values(HELPER_TYPE).map((type) => ({
      type,
      message: `Message ${type}`,
    }))

    render(
      <FormControl label="Label" helperBefore={helpers}>
        <input />
      </FormControl>,
    )

    expect(screen.getByTestId('icon-x')).toBeInTheDocument()
    expect(screen.getByTestId('icon-check')).toBeInTheDocument()
    expect(screen.getByTestId('icon-alert')).toBeInTheDocument()
    expect(screen.getByTestId('icon-info')).toBeInTheDocument()
  })

  it('renders the strength bar with active and inactive indicators', () => {
    render(
      <FormControl
        label="Password"
        helperAfter={[{ type: HELPER_TYPE.SUCCESS, message: 'Strong password', strength: 3 }]}
      >
        <input type="password" />
      </FormControl>,
    )

    const bars = screen.getAllByRole('presentation')
    expect(bars).toHaveLength(5)
    expect(bars.filter((bar) => bar.className.includes('bg-feedback-success-600'))).toHaveLength(3)
    expect(bars.filter((bar) => bar.className.includes('bg-black/10'))).toHaveLength(2)
  })

  it('does not render the strength bar if strength is not provided', () => {
    render(
      <FormControl
        label="Password"
        helperAfter={[{ type: HELPER_TYPE.SUCCESS, message: 'No strength' }]}
      >
        <input type="password" />
      </FormControl>,
    )

    expect(screen.queryAllByRole('presentation')).toHaveLength(0)
  })
})

describe('FormControl general structure', () => {
  it('renders the label correctly', () => {
    render(
      <FormControl label="Name">
        <input />
      </FormControl>,
    )
    expect(screen.getByText('Name')).toBeInTheDocument()
  })

  it('renders helperBefore before the children', () => {
    render(
      <FormControl label="Field" helperBefore={[{ type: HELPER_TYPE.INFO, message: 'Before' }]}>
        <div>children</div>
      </FormControl>,
    )

    const textNodes = screen.getAllByText(/Before|children/)
    expect(textNodes[0].textContent).toBe('Before')
    expect(textNodes[1].textContent).toBe('children')
  })

  it('renders helperAfter after the children', () => {
    render(
      <FormControl label="Field" helperAfter={[{ type: HELPER_TYPE.INFO, message: 'After' }]}>
        <div>children</div>
      </FormControl>,
    )

    const textNodes = screen.getAllByText(/children|After/)
    expect(textNodes[0].textContent).toBe('children')
    expect(textNodes[1].textContent).toBe('After')
  })

  it('uses max-w-form-control-width when fullWidth is false', () => {
    const { container } = render(
      <FormControl label="Test" fullWidth={false}>
        <input />
      </FormControl>,
    )
    expect((container.firstChild as HTMLElement).className).toContain('max-w-form-control-width')
  })

  it('does not use max-w-form-control-width when fullWidth is true', () => {
    const { container } = render(
      <FormControl label="Test" fullWidth={true}>
        <input />
      </FormControl>,
    )
    expect((container.firstChild as HTMLElement).className).not.toContain(
      'max-w-form-control-width',
    )
  })
})
