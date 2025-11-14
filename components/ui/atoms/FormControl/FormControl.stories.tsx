import type { Meta, StoryObj } from '@storybook/nextjs'
import { FormControl } from '@/components/ui/atoms/FormControl'

const inputClases =
  'w-full rounded-tiny border border-gray-300 bg-white p-0_25 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500'

const meta = {
  title: 'UI/FormControl',
  component: FormControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    children: { table: { disable: true } },
    beforeLabel: { table: { disable: true } },
    afterLabel: { table: { disable: true } },
    helperBefore: {
      control: 'object',
      description: `Expected:
      {
        type: "error" | "success" | "info" | "warning"
        message: string
        strength?: 0 | 1 | 2 | 3 | 4 | 5
      }`,
    },

    helperAfter: {
      control: 'object',
      description: `Expected:
      {
        type: "error" | "success" | "info" | "warning"
        message: string
        strength?: 0 | 1 | 2 | 3 | 4 | 5
      }`,
    },
  },
  render: (args) => {
    return (
      <FormControl {...args}>
        <input name="inputName" className={inputClases} placeholder="Input placeholder" />
      </FormControl>
    )
  },
} satisfies Meta<typeof FormControl>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: 'Form Control',
  },
}

export const Mandatory: Story = {
  args: {
    label: 'Mandatory',
    mandatory: true,
  },
}

export const BeforeLabel: Story = {
  args: {
    label: '<- Before label',
    beforeLabel: <div className="border-2 border-feedback-success-400 rounded-full h-1 w-1"></div>,
  },
}

export const AfterLabel: Story = {
  args: {
    label: 'After label ->',
    afterLabel: <div className="border-2 border-feedback-success-400 h-1 w-1"></div>,
  },
}

export const HelpersBefore: Story = {
  args: {
    label: 'Form Control (Helpers before)',
    helperBefore: [
      {
        type: 'info',
        message: 'Info Helper',
      },
      {
        type: 'warning',
        message: 'Warning Helper',
      },
      {
        type: 'success',
        message: 'Success Helper',
      },
      {
        type: 'error',
        message: 'Error Helper',
      },
    ],
  },
}

export const HelpersBeforeWithIndicators: Story = {
  args: {
    label: 'Form Control (Helpers after)',
    helperBefore: [
      {
        type: 'error',
        message: 'Error Value 0',
        strength: 0,
      },
      {
        type: 'error',
        message: 'Error Value 1',
        strength: 1,
      },
      {
        type: 'error',
        message: 'Error Value 2',
        strength: 2,
      },
      {
        type: 'error',
        message: 'Error Value 3',
        strength: 3,
      },
      {
        type: 'error',
        message: 'Error Value 4',
        strength: 4,
      },
      {
        type: 'error',
        message: 'Error Value 5',
        strength: 5,
      },
    ],
  },
}

export const HelpersAfter: Story = {
  args: {
    label: 'Form Control (Helpers before)',
    helperAfter: [
      {
        type: 'info',
        message: 'Info Helper',
      },
      {
        type: 'warning',
        message: 'Warning Helper',
      },
      {
        type: 'success',
        message: 'Success Helper',
      },
      {
        type: 'error',
        message: 'Error Helper',
      },
    ],
  },
}

export const HelpersAfterWithIndicators: Story = {
  args: {
    label: 'Form Control (Helpers before)',
    helperAfter: [
      {
        type: 'success',
        message: 'Indicator value 0',
        strength: 0,
      },
      {
        type: 'success',
        message: 'Indicator value 1',
        strength: 1,
      },
      {
        type: 'success',
        message: 'Indicator value 2',
        strength: 2,
      },
      {
        type: 'success',
        message: 'Indicator value 3',
        strength: 3,
      },
      {
        type: 'success',
        message: 'Indicator value 4',
        strength: 4,
      },
      {
        type: 'success',
        message: 'Indicator value 5',
        strength: 5,
      },
    ],
  },
}
