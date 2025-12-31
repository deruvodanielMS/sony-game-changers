'use client'

import { useTranslations } from 'next-intl'
import { ArrowLeft } from 'lucide-react'
import { ROUTES } from '@/common/routes'
import { Typography } from '@/components/ui/foundations/Typography'
import { Link } from '@/i18n/navigation'

export default function NewGoalPage() {
  const t = useTranslations('CreateGoal')

  return (
    <div className="flex flex-col gap-1 items-start">
      {/* Back button */}
      <Link
        href={ROUTES.GAME_CHANGERS_GOALS}
        className="inline-flex items-center gap-0_25 text-neutral-1000 hover:opacity-80 transition-opacity"
      >
        <ArrowLeft size={24} className="shrink-0" />
        <Typography variant="bodySmall" fontWeight="semibold" as="span">
          {t('back')}
        </Typography>
      </Link>

      {/* Title */}
      <Typography variant="h4" className="self-stretch">
        {t('title')}
      </Typography>

      {/* Content placeholder */}
      <div className="text-neutral-600">
        <p>{t('description')}</p>
      </div>
    </div>
  )
}
