import type { Meta, StoryObj } from '@storybook/react'
import { Plus } from 'lucide-react'
import { EmptyState } from './EmptyState'

const meta: Meta<typeof EmptyState> = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main title text displayed in bold',
    },
    description: {
      control: 'text',
      description: 'Description text displayed in secondary color',
    },
    actionLabel: {
      control: 'text',
      description: 'Call to action button text',
    },
    onAction: {
      action: 'clicked',
      description: 'Callback when action button is clicked',
    },
  },
}

export default meta
type Story = StoryObj<typeof EmptyState>

/**
 * Default empty state with title and description
 */
export const Default: Story = {
  args: {
    title: 'No items found',
    description: 'Try adjusting your filters or search terms.',
  },
}

/**
 * Empty state with only title
 */
export const TitleOnly: Story = {
  args: {
    title: 'No results',
  },
}

/**
 * Empty state with call to action
 */
export const WithAction: Story = {
  args: {
    title: 'No ambitions yet',
    description: 'Create your first ambition to get started.',
    actionLabel: 'Create Ambition',
    onAction: () => alert('Action clicked!'),
  },
}

/**
 * Empty state with action and icon
 */
export const WithActionAndIcon: Story = {
  args: {
    title: 'No Ambitions yet.',
    description: 'Create an Ambition to begin tracking your progress.',
    actionLabel: 'New Ambition',
    actionIcon: <Plus className="size-1.25" />,
    onAction: () => alert('New Ambition clicked!'),
  },
}

/**
 * Empty state for search results
 */
export const NoSearchResults: Story = {
  args: {
    title: 'No results found',
    description: "We couldn't find any matches for your search.",
    actionLabel: 'Clear search',
    onAction: () => alert('Clear search clicked!'),
  },
}

/**
 * Empty state for laddered ambitions
 */
export const NoLadderedAmbitions: Story = {
  args: {
    title: 'No laddered ambitions',
    description: "This goal doesn't have any laddered ambitions yet.",
    actionLabel: 'Add laddered Ambition',
    onAction: () => alert('Add clicked!'),
  },
}

/**
 * Empty state with custom width
 */
export const CustomWidth: Story = {
  args: {
    title: 'Empty section',
    description: 'There is nothing to display here.',
    className: 'w-[400px]',
  },
}
