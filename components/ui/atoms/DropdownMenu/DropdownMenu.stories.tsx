import type { Meta, StoryObj } from '@storybook/react'
import { Pencil, Archive, ArchiveRestore, Trash2, MoreHorizontal } from 'lucide-react'
import { DropdownMenu } from './DropdownMenu'
import { Button } from '@/components/ui/atoms/Button'

const meta = {
  title: 'Atoms/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
  },
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    trigger: (
      <button className="flex items-center justify-center p-2 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer">
        <MoreHorizontal className="size-6 text-neutral-1000" />
      </button>
    ),
    items: [
      { label: 'Edit', icon: <Pencil />, onClick: () => console.log('Edit clicked') },
      { label: 'Archive', icon: <Archive />, onClick: () => console.log('Archive clicked') },
    ],
  },
}

export const WithDangerItem: Story = {
  args: {
    trigger: (
      <button className="flex items-center justify-center p-2 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer">
        <MoreHorizontal className="size-6 text-neutral-1000" />
      </button>
    ),
    items: [
      { label: 'Edit', icon: <Pencil />, onClick: () => console.log('Edit clicked') },
      { label: 'Archive', icon: <Archive />, onClick: () => console.log('Archive clicked') },
      {
        label: 'Delete',
        icon: <Trash2 />,
        onClick: () => console.log('Delete clicked'),
        variant: 'danger',
      },
    ],
  },
}

export const WithDisabledItem: Story = {
  args: {
    trigger: (
      <button className="flex items-center justify-center p-2 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer">
        <MoreHorizontal className="size-6 text-neutral-1000" />
      </button>
    ),
    items: [
      { label: 'Edit', icon: <Pencil />, onClick: () => console.log('Edit clicked') },
      {
        label: 'Archive',
        icon: <Archive />,
        onClick: () => console.log('Archive clicked'),
        disabled: true,
      },
    ],
  },
}

export const WithButtonTrigger: Story = {
  args: {
    trigger: (
      <Button variant="secondary" size="small">
        Actions
      </Button>
    ),
    items: [
      { label: 'Edit', icon: <Pencil />, onClick: () => console.log('Edit clicked') },
      { label: 'Archive', icon: <Archive />, onClick: () => console.log('Archive clicked') },
      {
        label: 'Unarchive',
        icon: <ArchiveRestore />,
        onClick: () => console.log('Unarchive clicked'),
      },
    ],
  },
}

export const AlignStart: Story = {
  args: {
    trigger: (
      <button className="flex items-center justify-center p-2 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer">
        <MoreHorizontal className="size-6 text-neutral-1000" />
      </button>
    ),
    items: [
      { label: 'Edit', icon: <Pencil />, onClick: () => console.log('Edit clicked') },
      { label: 'Archive', icon: <Archive />, onClick: () => console.log('Archive clicked') },
    ],
    align: 'start',
  },
}

export const WithoutIcons: Story = {
  args: {
    trigger: (
      <button className="flex items-center justify-center p-2 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer">
        <MoreHorizontal className="size-6 text-neutral-1000" />
      </button>
    ),
    items: [
      { label: 'Edit', onClick: () => console.log('Edit clicked') },
      { label: 'Archive', onClick: () => console.log('Archive clicked') },
      { label: 'Delete', onClick: () => console.log('Delete clicked'), variant: 'danger' },
    ],
  },
}
