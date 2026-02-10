import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserCircle } from 'lucide-react'
import { BigSelectField } from './BigSelectField'
import type { BigSelectOption } from './BigSelectField.types'

const mockOptions: BigSelectOption[] = [
  {
    value: '1',
    label: 'John Doe',
    description: 'Product Manager',
    avatar: '/images/john.jpg',
  },
  {
    value: '2',
    label: 'Jane Smith',
    description: 'Engineering Lead',
    avatar: '/images/jane.jpg',
  },
  {
    value: '3',
    label: 'Bob Johnson',
    description: 'Designer',
    avatar: '/images/bob.jpg',
    disabled: true,
  },
]

describe('BigSelectField', () => {
  describe('Rendering', () => {
    it('should render with placeholder', () => {
      render(<BigSelectField options={mockOptions} placeholder="Select a person" />)
      expect(screen.getByText('Select a person')).toBeInTheDocument()
    })

    it('should render with label', () => {
      render(<BigSelectField options={mockOptions} label="Owner" placeholder="Select owner" />)
      expect(screen.getByText('Owner')).toBeInTheDocument()
    })

    it('should render required indicator when required', () => {
      render(<BigSelectField options={mockOptions} label="Owner" placeholder="Select" required />)
      expect(screen.getByText('*')).toBeInTheDocument()
    })

    it('should render with custom placeholder icon', () => {
      const { container } = render(
        <BigSelectField
          options={mockOptions}
          placeholder="Select"
          placeholderIcon={<UserCircle data-testid="custom-icon" />}
        />,
      )
      expect(container.querySelector('[data-testid="custom-icon"]')).toBeInTheDocument()
    })

    it('should render selected value with avatar and description', () => {
      render(<BigSelectField options={mockOptions} value="1" placeholder="Select" />)
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('Product Manager')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('should open dropdown when clicked', async () => {
      const user = userEvent.setup()
      render(<BigSelectField options={mockOptions} placeholder="Select" />)

      const trigger = screen.getByRole('combobox')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByRole('option', { name: /John Doe/i })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: /Jane Smith/i })).toBeInTheDocument()
      })
    })

    it('should call onValueChange when option is selected', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(
        <BigSelectField options={mockOptions} placeholder="Select" onValueChange={handleChange} />,
      )

      const trigger = screen.getByRole('combobox')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByRole('option', { name: /John Doe/i })).toBeInTheDocument()
      })

      await user.click(screen.getByRole('option', { name: /John Doe/i }))

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith('1')
      })
    })

    it('should not allow selecting disabled options', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(
        <BigSelectField options={mockOptions} placeholder="Select" onValueChange={handleChange} />,
      )

      const trigger = screen.getByRole('combobox')
      await user.click(trigger)

      await waitFor(() => {
        const disabledOption = screen.getByRole('option', { name: /Bob Johnson/i })
        expect(disabledOption).toHaveAttribute('aria-disabled', 'true')
      })
    })

    it('should be disabled when disabled prop is true', () => {
      render(<BigSelectField options={mockOptions} placeholder="Select" disabled />)
      const trigger = screen.getByRole('combobox')
      expect(trigger).toBeDisabled()
    })
  })

  describe('Error States', () => {
    it('should display error message', () => {
      render(
        <BigSelectField
          options={mockOptions}
          placeholder="Select"
          error="This field is required"
          data-test-id="test-select"
        />,
      )
      expect(screen.getByText('This field is required')).toBeInTheDocument()
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('should have error styling when error is present', () => {
      render(
        <BigSelectField
          options={mockOptions}
          placeholder="Select"
          error="This field is required"
        />,
      )
      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveAttribute('aria-invalid', 'true')
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <BigSelectField
          options={mockOptions}
          placeholder="Select owner"
          data-test-id="owner-select"
        />,
      )
      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveAttribute('aria-invalid', 'false')
    })

    it('should link error message with aria-describedby', () => {
      render(
        <BigSelectField
          options={mockOptions}
          placeholder="Select"
          error="Required field"
          data-test-id="test-select"
        />,
      )
      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveAttribute('aria-describedby', 'test-select-error')
    })

    it('should show check indicator for selected option', async () => {
      const user = userEvent.setup()
      render(<BigSelectField options={mockOptions} value="1" placeholder="Select" />)

      const trigger = screen.getByRole('combobox')
      await user.click(trigger)

      await waitFor(() => {
        const selectedOption = screen.getByRole('option', { name: /John Doe/i })
        expect(selectedOption).toBeInTheDocument()
      })
    })
  })

  describe('Custom Data Attributes', () => {
    it('should forward data-test-id to container', () => {
      const { container } = render(
        <BigSelectField options={mockOptions} placeholder="Select" data-test-id="custom-select" />,
      )
      const element = container.querySelector('[data-test-id="custom-select"]')
      expect(element).toBeInTheDocument()
    })
  })
})
