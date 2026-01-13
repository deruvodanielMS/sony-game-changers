import type { Meta, StoryObj } from '@storybook/react'
import { AnimatedSection } from './AnimatedSection'

const meta: Meta<typeof AnimatedSection> = {
  title: 'Foundations/AnimatedSection',
  component: AnimatedSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof AnimatedSection>

export const Default: Story = {
  args: {
    children: (
      <div className="p-4 bg-blue-100 rounded-lg">
        <h2 className="text-xl font-bold">Animated Content</h2>
        <p>This section fades in smoothly</p>
      </div>
    ),
  },
}

export const WithDelay: Story = {
  args: {
    delay: 0.5,
    children: (
      <div className="p-4 bg-green-100 rounded-lg">
        <h2 className="text-xl font-bold">Delayed Animation</h2>
        <p>This appears after 0.5 seconds</p>
      </div>
    ),
  },
}

export const MultipleStaggered: Story = {
  render: () => (
    <div className="space-y-4">
      <AnimatedSection delay={0}>
        <div className="p-4 bg-blue-100 rounded-lg">First Section</div>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <div className="p-4 bg-green-100 rounded-lg">Second Section (0.2s delay)</div>
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <div className="p-4 bg-purple-100 rounded-lg">Third Section (0.4s delay)</div>
      </AnimatedSection>
    </div>
  ),
}
