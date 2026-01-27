import type { Meta, StoryObj } from '@storybook/react'
import { Target, ListChecks, MessageSquare, BarChart3, Users } from 'lucide-react'
import { LayoutTabSection } from './LayoutTabSection'

const meta: Meta<typeof LayoutTabSection> = {
  title: 'Organisms/LayoutTabSection',
  component: LayoutTabSection,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const gameChangersSections = [
  {
    value: 'ambitions',
    label: 'Ambitions',
    href: '/game-changers/ambitions',
    icon: <Target size={20} />,
  },
  {
    value: 'check-ins',
    label: 'Check-ins',
    href: '/game-changers/check-ins',
    icon: <ListChecks size={20} />,
  },
  {
    value: 'feedback',
    label: 'Feedback',
    href: '/game-changers/feedback',
    icon: <MessageSquare size={20} />,
  },
  {
    value: 'performance-reviews',
    label: 'Performance Reviews',
    href: '/game-changers/performance-reviews',
    icon: <BarChart3 size={20} />,
  },
  {
    value: 'talent-planning',
    label: 'Talent Planning',
    href: '/game-changers/talent-planning',
    icon: <Users size={20} />,
  },
]

export const Default: Story = {
  args: {
    sections: gameChangersSections,
    basePath: 'game-changers',
    children: (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Tab Content</h2>
        <p>This is the content area below the tabs</p>
      </div>
    ),
  },
}

export const WithLongLabels: Story = {
  args: {
    sections: [
      {
        value: 'section-1',
        label: 'Very Long Section Name That Might Wrap',
        href: '/section-1',
        icon: <Target size={20} />,
      },
      {
        value: 'section-2',
        label: 'Another Long Title Here',
        href: '/section-2',
        icon: <ListChecks size={20} />,
      },
      {
        value: 'section-3',
        label: 'Short',
        href: '/section-3',
        icon: <MessageSquare size={20} />,
      },
    ],
    basePath: 'sections',
    children: (
      <div className="p-4">
        <p>Content area with tabs that have long labels</p>
      </div>
    ),
  },
}

export const DesktopView: Story = {
  render: () => (
    <div className="min-w-[768px]">
      <LayoutTabSection sections={gameChangersSections} basePath="game-changers">
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-4">Desktop Tab Navigation</h2>
          <p className="text-neutral-600 mb-4">
            This shows how the tabs appear on desktop (≥768px). The tabs are displayed in a
            horizontal row with full labels visible.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-4 bg-neutral-100 rounded">
                Content block {i + 1}
              </div>
            ))}
          </div>
        </div>
      </LayoutTabSection>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
}

export const MobileView: Story = {
  render: () => (
    <div className="max-w-[375px]">
      <LayoutTabSection sections={gameChangersSections} basePath="game-changers">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Mobile Tab Navigation</h2>
          <p className="text-sm text-neutral-600 mb-4">
            On mobile (under 768px), the tabs are scrollable horizontally. Swipe left/right to see
            all tabs.
          </p>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-3 bg-neutral-100 rounded">
                Content {i + 1}
              </div>
            ))}
          </div>
        </div>
      </LayoutTabSection>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

export const WithActiveContent: Story = {
  render: () => (
    <LayoutTabSection sections={gameChangersSections} basePath="game-changers">
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Ambitions</h1>
          <p className="text-lg text-neutral-600">Set and track your professional ambitions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-blue-50 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Active Ambitions</h3>
            <p className="text-3xl font-bold">5</p>
          </div>
          <div className="p-6 bg-green-50 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Completed</h3>
            <p className="text-3xl font-bold">12</p>
          </div>
          <div className="p-6 bg-purple-50 rounded-lg">
            <h3 className="font-bold text-lg mb-2">In Progress</h3>
            <p className="text-3xl font-bold">3</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Recent Ambitions</h2>
          <div className="space-y-3">
            <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
              <p className="font-semibold">Improve leadership skills</p>
              <p className="text-sm text-neutral-600">Started 2 weeks ago</p>
            </div>
            <div className="p-3 border-l-4 border-green-500 bg-green-50">
              <p className="font-semibold">Complete certification</p>
              <p className="text-sm text-neutral-600">Started 1 month ago</p>
            </div>
          </div>
        </div>
      </div>
    </LayoutTabSection>
  ),
}
