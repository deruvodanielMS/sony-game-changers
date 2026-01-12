import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { AppLayout } from '@/components/ui/templates/AppLayout'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function LangLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AppLayout>{children}</AppLayout>
}
