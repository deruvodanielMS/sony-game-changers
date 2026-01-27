import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'
import { AnimatedSection } from './AnimatedSection'

const meta: Meta<typeof AnimatedSection> = {
  title: 'Foundations/AnimatedSection',
  component: AnimatedSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A wrapper component that animates its children with a fade-in and slide-up effect using Framer Motion. Use delay prop to stagger multiple sections.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof AnimatedSection>

export const Default: Story = {
  args: {
    children: (
      <div className="space-y-4 min-w-[400px]">
        <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Feature Card</h2>
          <p className="text-blue-100">This card animates smoothly on mount</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-white border border-neutral-200 rounded-lg">
            <div className="text-3xl mb-2">📊</div>
            <p className="font-semibold text-sm">Analytics</p>
          </div>
          <div className="p-4 bg-white border border-neutral-200 rounded-lg">
            <div className="text-3xl mb-2">🎯</div>
            <p className="font-semibold text-sm">Goals</p>
          </div>
        </div>
        <p className="text-xs text-neutral-500 text-center">Reload story to see animation</p>
      </div>
    ),
  },
}

export const WithDelay: Story = {
  render: () => {
    const [key, setKey] = useState(0)

    useEffect(() => {
      const interval = setInterval(() => setKey((prev) => prev + 1), 4000)
      return () => clearInterval(interval)
    }, [])

    return (
      <AnimatedSection key={key} delay={0.5}>
        <div className="p-4 bg-green-100 rounded-lg">
          <h2 className="text-xl font-bold">Delayed Animation</h2>
          <p>This appears after 0.5 seconds (auto-replays every 4s)</p>
        </div>
      </AnimatedSection>
    )
  },
}

export const MultipleStaggered: Story = {
  render: () => {
    const [key, setKey] = useState(0)

    useEffect(() => {
      const interval = setInterval(() => setKey((prev) => prev + 1), 5000)
      return () => clearInterval(interval)
    }, [])

    return (
      <div className="space-y-4" key={key}>
        <AnimatedSection delay={0}>
          <div className="p-4 bg-blue-100 rounded-lg">First Section</div>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <div className="p-4 bg-green-100 rounded-lg">Second Section (0.2s delay)</div>
        </AnimatedSection>
        <AnimatedSection delay={0.4}>
          <div className="p-4 bg-purple-100 rounded-lg">Third Section (0.4s delay)</div>
        </AnimatedSection>
        <p className="text-sm text-neutral-500 text-center">Auto-replays every 5s</p>
      </div>
    )
  },
}
