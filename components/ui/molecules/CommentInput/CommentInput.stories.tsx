import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { CommentInput } from './CommentInput'

const meta: Meta<typeof CommentInput> = {
  title: 'Molecules/CommentInput',
  component: CommentInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A molecule that combines an Avatar with a TextArea for comment input. Supports Ctrl+Enter submission, character counting, and both controlled and uncontrolled modes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Controls the height of the textarea',
    },
    avatarSize: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the avatar',
    },
    showCharCount: {
      control: 'boolean',
      description: 'Shows character counter when maxLength is set',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the textarea',
    },
  },
}

export default meta
type Story = StoryObj<typeof CommentInput>

export const Default: Story = {
  args: {
    avatarAlt: 'John Doe',
    placeholder: 'Add a comment...',
  },
}

export const WithAvatar: Story = {
  args: {
    avatarSrc: '/profile-img/person1.webp',
    avatarAlt: 'Sarah Johnson',
    placeholder: 'Share your thoughts...',
  },
}

export const WithSubmit: Story = {
  args: {
    avatarSrc: '/profile-img/person2.webp',
    avatarAlt: 'Mike Chen',
    placeholder: 'Write a comment...',
    onSubmit: (value) => {
      alert(`Submitted: ${value}`)
    },
  },
}

export const WithCharacterCount: Story = {
  args: {
    avatarSrc: '/profile-img/person3.webp',
    avatarAlt: 'Emma Wilson',
    placeholder: 'Add a comment (max 200 characters)...',
    maxLength: 200,
    showCharCount: true,
  },
}

export const SmallSize: Story = {
  args: {
    avatarAlt: 'User',
    placeholder: 'Quick comment...',
    size: 'sm',
    avatarSize: 'sm',
  },
}

export const LargeSize: Story = {
  args: {
    avatarSrc: '/profile-img/person4.webp',
    avatarAlt: 'David Park',
    placeholder: 'Write a detailed comment...',
    size: 'lg',
    avatarSize: 'lg',
  },
}

export const Disabled: Story = {
  args: {
    avatarAlt: 'User',
    placeholder: 'Comments disabled',
    disabled: true,
    defaultValue: 'This comment input is disabled',
  },
}

export const CustomHeight: Story = {
  args: {
    avatarSrc: '/profile-img/person5.webp',
    avatarAlt: 'Lisa Brown',
    placeholder: 'Custom height textarea...',
    height: '200px',
  },
}

// Controlled mode example
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const [comments, setComments] = useState<string[]>([])

    const handleSubmit = (comment: string) => {
      setComments([...comments, comment])
      setValue('')
    }

    return (
      <div className="space-y-4">
        <CommentInput
          avatarSrc="/profile-img/person1.webp"
          avatarAlt="Current User"
          placeholder="Write a comment... (Ctrl+Enter to submit)"
          value={value}
          onChange={setValue}
          onSubmit={handleSubmit}
          maxLength={300}
          showCharCount
        />

        {comments.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Comments ({comments.length})
            </h3>
            {comments.map((comment, index) => (
              <div key={index} className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <p className="text-sm text-neutral-700 dark:text-neutral-300">{comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  },
}

// Uncontrolled mode example
export const Uncontrolled: Story = {
  render: () => {
    const [comments, setComments] = useState<string[]>([])

    const handleSubmit = (comment: string) => {
      setComments([...comments, comment])
    }

    return (
      <div className="space-y-4">
        <CommentInput
          avatarSrc="/profile-img/person2.webp"
          avatarAlt="Current User"
          placeholder="Write a comment... (Ctrl+Enter to submit)"
          onSubmit={handleSubmit}
        />

        {comments.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Comments ({comments.length})
            </h3>
            {comments.map((comment, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
              >
                <img src="/profile-img/person2.webp" alt="User" className="w-8 h-8 rounded-full" />
                <p className="text-sm text-neutral-700 dark:text-neutral-300">{comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  },
}
