import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A skeleton loading component used to indicate content is loading. Provides visual placeholders that match the shape of the actual content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'circular',
        'rectangular',
        'avatar',
        'button',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'body',
        'bodySmall',
        'bodyTiny',
      ],
      description: 'Variant of the skeleton placeholder',
      table: {
        defaultValue: { summary: 'body' },
      },
    },
    width: {
      control: 'text',
      description: 'Custom width (CSS value)',
    },
    height: {
      control: 'text',
      description: 'Custom height (CSS value)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="max-w-md">
      <Skeleton width="300px" />
    </div>
  ),
}

export const Body: Story = {
  render: () => (
    <div className="max-w-md">
      <Skeleton variant="body" width="300px" />
    </div>
  ),
}

export const BodySmall: Story = {
  args: {
    variant: 'bodySmall',
    width: '160px',
  },
}

export const BodyTiny: Story = {
  args: {
    variant: 'bodyTiny',
    width: '100px',
  },
}

export const H1: Story = {
  args: {
    variant: 'h1',
    width: '400px',
  },
}

export const H2: Story = {
  args: {
    variant: 'h2',
    width: '300px',
  },
}

export const H3: Story = {
  args: {
    variant: 'h3',
    width: '200px',
  },
}

export const H4: Story = {
  args: {
    variant: 'h4',
    width: '180px',
  },
}

export const H5: Story = {
  args: {
    variant: 'h5',
    width: '160px',
  },
}

export const H6: Story = {
  args: {
    variant: 'h6',
    width: '140px',
  },
}

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: '300px',
    height: '200px',
  },
}

export const Avatar: Story = {
  args: {
    variant: 'avatar',
    width: 'var(--space-3)',
  },
}

export const Button: Story = {
  args: {
    variant: 'button',
    width: '120px',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-1_5 max-w-2xl">
      <div className="flex flex-col gap-0_5">
        <span className="text-xs text-neutral-600 font-medium">Body (default)</span>
        <Skeleton variant="body" width="100%" />
      </div>
      <div className="flex flex-col gap-0_5">
        <span className="text-xs text-neutral-600 font-medium">Title</span>
        <Skeleton variant="h3" width="200px" />
      </div>
      <div className="flex flex-col gap-0_5">
        <span className="text-xs text-neutral-600 font-medium">Heading</span>
        <Skeleton variant="h2" width="300px" />
      </div>
      <div className="flex flex-col gap-0_5">
        <span className="text-xs text-neutral-600 font-medium">Circular</span>
        <Skeleton variant="circular" width="var(--space-3)" height="var(--space-3)" />
      </div>
      <div className="flex flex-col gap-0_5">
        <span className="text-xs text-neutral-600 font-medium">Rectangular</span>
        <Skeleton variant="rectangular" width="300px" height="100px" />
      </div>
      <div className="flex flex-col gap-0_5">
        <span className="text-xs text-neutral-600 font-medium">Avatar</span>
        <Skeleton variant="avatar" width="var(--space-3)" />
      </div>
      <div className="flex flex-col gap-0_5">
        <span className="text-xs text-neutral-600 font-medium">Button</span>
        <Skeleton variant="button" width="120px" />
      </div>
    </div>
  ),
}

export const TextBlock: Story = {
  render: () => (
    <div className="flex flex-col gap-0_5 max-w-xl">
      <Skeleton variant="h3" width="60%" />
      <Skeleton variant="body" width="100%" />
      <Skeleton variant="body" width="95%" />
      <Skeleton variant="body" width="80%" />
    </div>
  ),
}

export const UserCard: Story = {
  render: () => (
    <div className="flex items-start gap-0_75 p-1 border border-neutral-300 rounded-default max-w-md">
      <Skeleton variant="avatar" width="var(--space-3)" />
      <div className="flex-1 flex flex-col gap-0_5">
        <Skeleton variant="h3" width="150px" />
        <Skeleton variant="body" width="100%" />
        <Skeleton variant="body" width="70%" />
      </div>
    </div>
  ),
}

export const ArticlePreview: Story = {
  render: () => (
    <div className="flex flex-col gap-0_75 p-1 border border-neutral-300 rounded-default max-w-md">
      <Skeleton variant="rectangular" width="100%" height="150px" />
      <Skeleton variant="h2" width="80%" />
      <Skeleton variant="body" width="100%" />
      <Skeleton variant="body" width="95%" />
      <Skeleton variant="body" width="60%" />
      <div className="flex gap-0_5 mt-0_5">
        <Skeleton variant="button" width="100px" />
        <Skeleton variant="button" width="80px" />
      </div>
    </div>
  ),
}

export const FormSkeleton: Story = {
  render: () => (
    <div className="flex flex-col gap-0_75 p-1 border border-neutral-300 rounded-default max-w-md">
      <div className="flex flex-col gap-0_25">
        <Skeleton variant="body" width="80px" />
        <Skeleton variant="rectangular" width="100%" height="var(--space-2_75)" />
      </div>
      <div className="flex flex-col gap-0_25">
        <Skeleton variant="body" width="100px" />
        <Skeleton variant="rectangular" width="100%" height="var(--space-2_75)" />
      </div>
      <div className="flex flex-col gap-0_25">
        <Skeleton variant="body" width="120px" />
        <Skeleton variant="rectangular" width="100%" height="100px" />
      </div>
      <div className="flex gap-0_5">
        <Skeleton variant="button" width="100px" />
        <Skeleton variant="button" width="100px" />
      </div>
    </div>
  ),
}

export const ListSkeleton: Story = {
  render: () => (
    <div className="flex flex-col gap-0_75 max-w-md">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-0_75 p-0_75 border border-neutral-200 rounded-default"
        >
          <Skeleton variant="circular" width="var(--space-2_75)" height="var(--space-2_75)" />
          <div className="flex-1 flex flex-col gap-0_25">
            <Skeleton variant="h3" width="60%" />
            <Skeleton variant="body" width="80%" />
          </div>
        </div>
      ))}
    </div>
  ),
}
