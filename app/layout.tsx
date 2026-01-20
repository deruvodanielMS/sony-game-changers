import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'

import { Inter } from 'next/font/google'

import './globals.css'
import { DEFAULT_LANGUAGE } from '@/common/constants'
import { Providers } from './providers'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  icons: {
    icon: '/playstation-logo.svg',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={DEFAULT_LANGUAGE} data-theme="light">
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
