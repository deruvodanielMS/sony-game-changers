import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  args: {
    children: 'Card content',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {},
}

export const CustomClass: Story = {
  args: {
    className: 'bg-blue-100 border-blue-300',
    children: 'Card with custom styles',
  },
}

export const LargeContent: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-h3 leading-h3">Title</h3>
        <p className="text-body leading-body">
          This is a card with a larger amount of content to demonstrate how the Card component
          handles overflow and larger children elements. You can add more text, images, or other
          components inside the Card to see how it adapts.
        </p>
      </div>
    ),
  },
}
