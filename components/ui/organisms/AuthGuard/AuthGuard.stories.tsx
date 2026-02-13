import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { AuthGuard } from './AuthGuard'
import { SessionProvider } from 'next-auth/react'

const meta = {
  title: 'Organisms/AuthGuard',
  component: AuthGuard,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof AuthGuard>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default AuthGuard - expanded state
 */
export const Default: Story = {
  args: { children: <div>Protected Content</div> },
  decorators: [
    (Story) => (
      <SessionProvider session={null}>
        <Story />
      </SessionProvider>
    ),
  ],
  render: (args) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    return (
      <div>
        <button
          onClick={() => setIsAuthenticated((prev) => !prev)}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Toggle Auth (Currently: {isAuthenticated ? 'Authenticated' : 'Unauthenticated'})
        </button>
        <AuthGuard {...args}>
          {isAuthenticated ? args.children : <div>Please log in to see the content.</div>}
        </AuthGuard>
      </div>
    )
  },
}
