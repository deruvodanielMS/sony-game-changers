'use client'

import { Typography } from '@/components/ui/foundations/Typography'
import { useTranslations } from 'next-intl'

export function Error({
  title,
  description,
  children,
}: {
  title?: string
  description?: string
  children?: React.ReactNode
}) {
  const t = useTranslations('Error')

  return (
    <section className="bg-neutral-0 h-screen flex items-center justify-center">
      <div className="mx-auto max-w-screen-sm text-center flex flex-col gap-1_5">
        <Typography variant={'h3'}>{title || t('title')}</Typography>
        <Typography variant={'body'}>{description || t('description')}</Typography>
        {children}
      </div>
    </section>
  )
}
