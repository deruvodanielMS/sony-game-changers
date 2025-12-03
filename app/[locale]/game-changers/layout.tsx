'use client'

import { ROUTES } from '@/common/routes'
import { useTranslations } from 'next-intl'
import { LayoutTabSection } from '@/components/ui/organisms/LayoutTabSection/LayoutTabSection'
import {
  RadarIcon,
  CalendarIcon,
  ChatIcon,
  UserCertificationIcon,
  UserActivityIcon,
} from '@/components/ui/foundations/Icons'

export default function GameChangersLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('Pages')
  const sections = [
    {
      label: t('gameChangersGoals'),
      value: 'goals',
      href: ROUTES.GAME_CHANGERS_GOALS,
      icon: <RadarIcon className="w-5 h-5" />,
    },
    {
      label: t('gameChangersCheckIns'),
      value: 'check-ins',
      href: ROUTES.GAME_CHANGERS_CHECK_INS,
      icon: <CalendarIcon className="w-5 h-5" />,
    },
    {
      label: t('gameChangersFeedback'),
      value: 'feedback',
      href: ROUTES.GAME_CHANGERS_FEEDBACK,
      icon: <ChatIcon className="w-5 h-5" />,
    },
    {
      label: t('gameChangersPerformanceReviews'),
      value: 'performance-reviews',
      href: ROUTES.GAME_CHANGERS_PERFORMANCE_REVIEW,
      icon: <UserCertificationIcon className="w-5 h-5" />,
    },
    {
      label: t('gameChangersTalentPlanning'),
      value: 'talent-planning',
      href: ROUTES.GAME_CHANGERS_TALENT_PLANNING,
      icon: <UserActivityIcon className="w-5 h-5" />,
    },
  ]

  return <LayoutTabSection sections={sections}>{children}</LayoutTabSection>
}
