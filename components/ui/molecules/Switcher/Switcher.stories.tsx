import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Switcher } from './Switcher'
import { RadarIcon, CalendarIcon, ChatIcon } from '@/components/ui/foundations/Icons'

/**
 * Switcher is a multi-option selector component with variants for different visual styles.
 * It supports icons, labels, or both, and comes in two sizes.
 *
 * ## Usage
 * Use Switcher for:
 * - Navigation between sections (e.g., Game Changers tabs)
 * - Status selection (e.g., achievement progress: Off track, On track, Done)
 * - Multi-choice toggles with visual feedback
 */
const meta = {
  title: 'Molecules/Switcher',
  component: Switcher,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'Size variant of the switcher',
    },
    variant: {
      control: 'select',
      options: ['generic', 'success', 'info', 'error'],
      description: 'Color variant of the switcher',
    },
    value: {
      control: 'text',
      description: 'Currently selected item ID',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the switcher',
    },
  },
} satisfies Meta<typeof Switcher>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default switcher with text labels only
 */
export const Default: Story = {
  args: {
    items: [
      { id: 'option1', label: 'Option 1' },
      { id: 'option2', label: 'Option 2' },
      { id: 'option3', label: 'Option 3' },
    ],
    value: 'option1',
    onChange: () => {},
    ariaLabel: 'Default switcher',
  },
  render: () => {
    const [value, setValue] = useState('option1')
    return (
      <Switcher
        items={[
          { id: 'option1', label: 'Option 1' },
          { id: 'option2', label: 'Option 2' },
          { id: 'option3', label: 'Option 3' },
        ]}
        value={value}
        onChange={setValue}
        ariaLabel="Default switcher"
      />
    )
  },
}

/**
 * Small size variant (48px height)
 */
export const SmallSize: Story = {
  args: {
    items: [
      { id: 'off-track', label: 'Off track' },
      { id: 'on-track', label: 'On track' },
      { id: 'done', label: 'Done' },
    ],
    value: 'on-track',
    onChange: () => {},
    size: 'small',
    variant: 'generic',
    ariaLabel: 'Progress status',
  },
  render: () => {
    const [value, setValue] = useState('on-track')
    return (
      <Switcher
        items={[
          { id: 'off-track', label: 'Off track' },
          { id: 'on-track', label: 'On track' },
          { id: 'done', label: 'Done' },
        ]}
        value={value}
        onChange={setValue}
        size="small"
        variant="generic"
        ariaLabel="Progress status"
      />
    )
  },
}

/**
 * Large size variant with icons
 */
export const LargeSize: Story = {
  args: {
    items: [
      { id: 'ambitions', label: 'Ambitions', icon: <RadarIcon /> },
      { id: 'check-ins', label: 'Check-ins', icon: <CalendarIcon /> },
      { id: 'feedback', label: 'Feedback', icon: <ChatIcon /> },
    ],
    value: 'ambitions',
    onChange: () => {},
    size: 'large',
    variant: 'generic',
    ariaLabel: 'Navigation',
  },
  render: () => {
    const [value, setValue] = useState('ambitions')
    return (
      <Switcher
        items={[
          { id: 'ambitions', label: 'Ambitions', icon: <RadarIcon /> },
          { id: 'check-ins', label: 'Check-ins', icon: <CalendarIcon /> },
          { id: 'feedback', label: 'Feedback', icon: <ChatIcon /> },
        ]}
        value={value}
        onChange={setValue}
        size="large"
        variant="generic"
        ariaLabel="Navigation"
      />
    )
  },
}

/**
 * Success variant (green)
 */
export const SuccessVariant: Story = {
  args: {
    items: [
      { id: 'off-track', label: 'Off track' },
      { id: 'on-track', label: 'On track' },
      { id: 'done', label: 'Done' },
    ],
    value: 'done',
    onChange: () => {},
    size: 'small',
    variant: 'success',
    ariaLabel: 'Success status',
  },
  render: () => {
    const [value, setValue] = useState('done')
    return (
      <Switcher
        items={[
          { id: 'off-track', label: 'Off track' },
          { id: 'on-track', label: 'On track' },
          { id: 'done', label: 'Done' },
        ]}
        value={value}
        onChange={setValue}
        size="small"
        variant="success"
        ariaLabel="Success status"
      />
    )
  },
}

/**
 * Info variant (blue)
 */
export const InfoVariant: Story = {
  args: {
    items: [
      { id: 'off-track', label: 'Off track' },
      { id: 'on-track', label: 'On track' },
      { id: 'done', label: 'Done' },
    ],
    value: 'on-track',
    onChange: () => {},
    size: 'small',
    variant: 'info',
    ariaLabel: 'Info status',
  },
  render: () => {
    const [value, setValue] = useState('on-track')
    return (
      <Switcher
        items={[
          { id: 'off-track', label: 'Off track' },
          { id: 'on-track', label: 'On track' },
          { id: 'done', label: 'Done' },
        ]}
        value={value}
        onChange={setValue}
        size="small"
        variant="info"
        ariaLabel="Info status"
      />
    )
  },
}

/**
 * Error variant (red) - same as danger
 */
export const ErrorVariant: Story = {
  args: {
    items: [
      { id: 'off-track', label: 'Off track' },
      { id: 'on-track', label: 'On track' },
      { id: 'done', label: 'Done' },
    ],
    value: 'off-track',
    onChange: () => {},
    size: 'small',
    variant: 'error',
    ariaLabel: 'Error status',
  },
  render: () => {
    const [value, setValue] = useState('off-track')
    return (
      <Switcher
        items={[
          { id: 'off-track', label: 'Off track' },
          { id: 'on-track', label: 'On track' },
          { id: 'done', label: 'Done' },
        ]}
        value={value}
        onChange={setValue}
        size="small"
        variant="error"
        ariaLabel="Error status"
      />
    )
  },
}

/**
 * Generic variant (neutral gray)
 */
export const GenericVariant: Story = {
  args: {
    items: [
      { id: 'option1', label: 'Option 1' },
      { id: 'option2', label: 'Option 2' },
      { id: 'option3', label: 'Option 3' },
    ],
    value: 'option2',
    onChange: () => {},
    size: 'small',
    variant: 'generic',
    ariaLabel: 'Generic options',
  },
  render: () => {
    const [value, setValue] = useState('option2')
    return (
      <Switcher
        items={[
          { id: 'option1', label: 'Option 1' },
          { id: 'option2', label: 'Option 2' },
          { id: 'option3', label: 'Option 3' },
        ]}
        value={value}
        onChange={setValue}
        size="small"
        variant="generic"
        ariaLabel="Generic options"
      />
    )
  },
}

/**
 * Icons only (no labels)
 */
export const IconsOnly: Story = {
  args: {
    items: [
      { id: 'ambitions', icon: <RadarIcon /> },
      { id: 'check-ins', icon: <CalendarIcon /> },
      { id: 'feedback', icon: <ChatIcon /> },
    ],
    value: 'ambitions',
    onChange: () => {},
    size: 'large',
    variant: 'generic',
    ariaLabel: 'Icon navigation',
  },
  render: () => {
    const [value, setValue] = useState('ambitions')
    return (
      <Switcher
        items={[
          { id: 'ambitions', icon: <RadarIcon /> },
          { id: 'check-ins', icon: <CalendarIcon /> },
          { id: 'feedback', icon: <ChatIcon /> },
        ]}
        value={value}
        onChange={setValue}
        size="large"
        variant="generic"
        ariaLabel="Icon navigation"
      />
    )
  },
}

/**
 * With disabled items
 */
export const WithDisabled: Story = {
  args: {
    items: [
      { id: 'option1', label: 'Active' },
      { id: 'option2', label: 'Disabled', disabled: true },
      { id: 'option3', label: 'Active' },
    ],
    value: 'option1',
    onChange: () => {},
    size: 'small',
    variant: 'generic',
    ariaLabel: 'Options with disabled',
  },
  render: () => {
    const [value, setValue] = useState('option1')
    return (
      <Switcher
        items={[
          { id: 'option1', label: 'Active' },
          { id: 'option2', label: 'Disabled', disabled: true },
          { id: 'option3', label: 'Active' },
        ]}
        value={value}
        onChange={setValue}
        size="small"
        variant="generic"
        ariaLabel="Options with disabled"
      />
    )
  },
}

/**
 * All variants comparison
 */
export const AllVariants: Story = {
  args: {
    items: [
      { id: 'option1', label: 'Option 1' },
      { id: 'option2', label: 'Option 2' },
      { id: 'option3', label: 'Option 3' },
    ],
    value: 'option1',
    onChange: () => {},
    ariaLabel: 'All variants',
  },
  render: () => {
    const [genericValue, setGenericValue] = useState('option2')
    const [successValue, setSuccessValue] = useState('done')
    const [infoValue, setInfoValue] = useState('on-track')
    const [errorValue, setErrorValue] = useState('off-track')

    return (
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-sm text-neutral-600 mb-1">Generic</p>
          <Switcher
            items={[
              { id: 'option1', label: 'Option 1' },
              { id: 'option2', label: 'Option 2' },
              { id: 'option3', label: 'Option 3' },
            ]}
            value={genericValue}
            onChange={setGenericValue}
            variant="generic"
            ariaLabel="Generic variant"
          />
        </div>
        <div>
          <p className="text-sm text-neutral-600 mb-1">Success</p>
          <Switcher
            items={[
              { id: 'off-track', label: 'Off track' },
              { id: 'on-track', label: 'On track' },
              { id: 'done', label: 'Done' },
            ]}
            value={successValue}
            onChange={setSuccessValue}
            variant="success"
            ariaLabel="Success variant"
          />
        </div>
        <div>
          <p className="text-sm text-neutral-600 mb-1">Info</p>
          <Switcher
            items={[
              { id: 'off-track', label: 'Off track' },
              { id: 'on-track', label: 'On track' },
              { id: 'done', label: 'Done' },
            ]}
            value={infoValue}
            onChange={setInfoValue}
            variant="info"
            ariaLabel="Info variant"
          />
        </div>
        <div>
          <p className="text-sm text-neutral-600 mb-1">Error</p>
          <Switcher
            items={[
              { id: 'off-track', label: 'Off track' },
              { id: 'on-track', label: 'On track' },
              { id: 'done', label: 'Done' },
            ]}
            value={errorValue}
            onChange={setErrorValue}
            variant="error"
            ariaLabel="Error variant"
          />
        </div>
      </div>
    )
  },
}
