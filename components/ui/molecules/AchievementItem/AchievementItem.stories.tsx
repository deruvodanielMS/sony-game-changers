import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { AchievementItem } from './AchievementItem'
import type { ProgressStatus } from './AchievementItem.types'

const meta: Meta<typeof AchievementItem> = {
  title: 'UI/Molecules/AchievementItem',
  component: AchievementItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Displays an achievement with checkbox, optional progress tracking, and visual feedback for completion. Used in achievement lists and checklists to track goals and milestones.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size variant for mobile (sm) or desktop (md)',
    },
    progress: {
      control: 'select',
      options: ['not-started', 'on-track', 'off-track', null],
      description: 'Progress status when not completed',
    },
  },
}

export default meta
type Story = StoryObj<typeof AchievementItem>

export const Default: Story = {
  args: {
    text: 'Complete onboarding process',
  },
}

export const Completed: Story = {
  args: {
    text: 'Finish Q1 performance review',
    completed: true,
  },
}

export const NotStarted: Story = {
  args: {
    text: 'Set up team meeting schedule',
    progress: 'not-started',
  },
}

export const OnTrack: Story = {
  args: {
    text: 'Improve customer satisfaction score',
    progress: 'on-track',
  },
}

export const OffTrack: Story = {
  args: {
    text: 'Reduce response time by 20%',
    progress: 'off-track',
  },
}

export const WithoutProgressSelector: Story = {
  args: {
    text: 'Simple task without progress tracking',
    showProgressSelector: false,
  },
}

export const SmallSize: Story = {
  args: {
    text: 'Mobile-sized achievement item',
    size: 'sm',
    progress: 'on-track',
  },
}

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [completed, setCompleted] = useState(false)
    const [progress, setProgress] = useState<ProgressStatus>('not-started')

    return (
      <AchievementItem
        text="Complete project documentation"
        completed={completed}
        progress={progress}
        onToggle={setCompleted}
        onProgressChange={setProgress}
      />
    )
  },
}

// Multiple achievements list
export const AchievementsList: Story = {
  render: () => {
    const [achievements, setAchievements] = useState([
      { id: 1, text: 'Complete onboarding', completed: true, progress: null as ProgressStatus },
      {
        id: 2,
        text: 'Set quarterly goals',
        completed: false,
        progress: 'on-track' as ProgressStatus,
      },
      {
        id: 3,
        text: 'Schedule 1-on-1 meetings',
        completed: false,
        progress: 'on-track' as ProgressStatus,
      },
      {
        id: 4,
        text: 'Review team feedback',
        completed: false,
        progress: 'off-track' as ProgressStatus,
      },
      {
        id: 5,
        text: 'Prepare performance review',
        completed: false,
        progress: 'not-started' as ProgressStatus,
      },
    ])

    const handleToggle = (id: number, completed: boolean) => {
      setAchievements((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, completed, progress: completed ? null : item.progress }
            : item,
        ),
      )
    }

    const handleProgressChange = (id: number, progress: ProgressStatus) => {
      setAchievements((prev) => prev.map((item) => (item.id === id ? { ...item, progress } : item)))
    }

    const completedCount = achievements.filter((a) => a.completed).length

    return (
      <div className="max-w-2xl">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-bold">My Achievements</h3>
          <span className="text-sm text-neutral-600">
            {completedCount} of {achievements.length} completed
          </span>
        </div>
        <div className="flex flex-col gap-1">
          {achievements.map((achievement) => (
            <AchievementItem
              key={achievement.id}
              text={achievement.text}
              completed={achievement.completed}
              progress={achievement.progress}
              onToggle={(completed) => handleToggle(achievement.id, completed)}
              onProgressChange={(progress) => handleProgressChange(achievement.id, progress)}
            />
          ))}
        </div>
      </div>
    )
  },
}

// Mobile view
export const MobileList: Story = {
  render: () => (
    <div className="max-w-sm">
      <div className="flex flex-col gap-1">
        <AchievementItem text="Complete onboarding process" completed={true} size="sm" />
        <AchievementItem
          text="Set up quarterly goals and objectives"
          progress="on-track"
          size="sm"
        />
        <AchievementItem text="Review team performance metrics" progress="off-track" size="sm" />
      </div>
    </div>
  ),
}
