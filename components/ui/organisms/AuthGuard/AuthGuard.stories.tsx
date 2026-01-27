import type { Meta, StoryObj } from '@storybook/react'
import { AuthGuard } from './AuthGuard'

const meta: Meta<typeof AuthGuard> = {
  title: 'Organisms/AuthGuard',
  component: AuthGuard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Note: This component requires NextAuth session context.
 * In production, it redirects unauthenticated users to the login page.
 * For Storybook, we show the loading state as an example.
 */
export const LoadingState: Story = {
  render: () => (
    <div className="p-8">
      <p className="text-sm text-neutral-600 mb-4">
        Note: AuthGuard requires NextAuth context. This shows the loading state that appears while
        checking authentication.
      </p>
      <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8">
        <p className="text-center text-neutral-500">
          In a real app, users would see a spinner here while authentication is being verified.
        </p>
      </div>
    </div>
  ),
}

export const ConceptualFlow: Story = {
  render: () => (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold">AuthGuard Concept</h2>
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="font-semibold text-blue-900">1. Unauthenticated</p>
          <p className="text-sm text-blue-700">User is redirected to login page (Okta)</p>
        </div>
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
          <p className="font-semibold text-yellow-900">2. Loading</p>
          <p className="text-sm text-yellow-700">Spinner displayed while checking session</p>
        </div>
        <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
          <p className="font-semibold text-green-900">3. Authenticated</p>
          <p className="text-sm text-green-700">Protected content is displayed</p>
        </div>
      </div>
    </div>
  ),
}
