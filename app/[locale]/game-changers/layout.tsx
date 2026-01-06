'use client'

import { usePathname } from 'next/navigation'
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
  const pathname = usePathname()

  // Hide tabs on creation/edit pages
  const shouldHideTabs = pathname.includes('/new') || pathname.includes('/edit')

  const sections = [
    {
      label: t('gameChangersGoals'),
      value: 'goals',
      href: ROUTES.GAME_CHANGERS_AMBITIONS,
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

  if (shouldHideTabs) {
    return <div className="px-3 pt-20 md:pt-1_5">{children}</div>
  }

  return (
    <LayoutTabSection basePath="game-changers" sections={sections}>
      {children}
    </LayoutTabSection>
  )
}
