import type { Preview } from '@storybook/nextjs'
import { Inter } from 'next/font/google'
import React from 'react'
import { NextIntlClientProvider } from 'next-intl'
import '../app/globals.css'
import messages from '../messages/en.json'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

/**
 * Decorator component that applies theme, font, and i18n configuration to Storybook stories
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

  return (
    <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
      <div className={`${inter.variable} font-sans`}>{children}</div>
    </NextIntlClientProvider>
  )
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
