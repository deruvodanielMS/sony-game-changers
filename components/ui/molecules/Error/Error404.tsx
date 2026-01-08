'use client'

import { Typography } from '@/components/ui/foundations/Typography'
import { cn } from '@/utils/cn'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function Error404() {
  const t = useTranslations('NotFound')

  return (
    <section className="bg-neutral-0 h-screen flex items-center justify-center">
      <div className="mx-auto max-w-screen-sm text-center flex flex-col gap-1_5">
        <Typography variant={'h1'}>404</Typography>
        <Typography variant={'h3'}>{t('title')}</Typography>
        <Typography variant={'body'}>{t('description')}</Typography>
        <Link
          href="/"
          className={cn(
            'transition-hover',
            'inline-flex items-center justify-center',
            'font-semibold transition-all duration-200 outline-none cursor-pointer',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'focus-visible:ring-4 focus-visible:ring-accent-primary/20 focus-visible:outline-none',
            'rounded-x-large',
            'bg-gradient-to-l from-button-primary-from to-button-primary-to',
            'hover:shadow-button-primary',
            'active:scale-[0.98]',
            'h-2',
            'px-1 py-0_75',
            'text-body-small leading-body-small',
            'text-neutral-0',
          )}
        >
          {t('goHome')}
        </Link>
      </div>
    </section>
  )
}
