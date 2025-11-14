import type { Preview } from '@storybook/nextjs'
import { Inter } from 'next/font/google'
import React from 'react'
import '../app/globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

/**
 * Decorator component that applies theme and font configuration to Storybook stories
 */
const ThemeDecorator = ({
  children,
  context,
}: {
  children: React.ReactNode
  context?: { globals?: { theme?: string } }
}) => {
  // Apply data-theme to document root for Storybook
  React.useEffect(() => {
    const theme = context?.globals?.theme || 'light'
    document.documentElement.setAttribute('data-theme', theme)
  }, [context?.globals?.theme])

  return <div className={`${inter.variable} font-sans`}>{children}</div>
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <ThemeDecorator context={context}>
        <Story />
      </ThemeDecorator>
    ),
  ],
}

export default preview
