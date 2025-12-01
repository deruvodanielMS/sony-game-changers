'use client'

import { ROUTES } from '@/common/routes'
import { useTranslations } from 'next-intl'
import { LayoutTabSection } from '@/components/ui/organisms/LayoutTabSection/LayoutTabSection'
import {
  Calendar,
  MessageSquareText,
  UserStar,
  UserCheck,
  CircleArrowOutUpRight,
} from 'lucide-react'

export default function GameChangersLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('Pages')
  const sections = [
    {
      label: t('gameChangersGoals'),
      value: 'goals',
      href: ROUTES.GAME_CHANGERS_GOALS,
      icon: <CircleArrowOutUpRight size={20} />,
    },
    {
      label: t('gameChangersCheckIns'),
      value: 'check-ins',
      href: ROUTES.GAME_CHANGERS_CHECK_INS,
      icon: <Calendar size={20} />,
    },
    {
      label: t('gameChangersFeedback'),
      value: 'feedback',
      href: ROUTES.GAME_CHANGERS_FEEDBACK,
      icon: <MessageSquareText size={20} />,
    },
    {
      label: t('gameChangersPerformanceReviews'),
      value: 'performance-reviews',
      href: ROUTES.GAME_CHANGERS_PERFORMANCE_REVIEW,
      icon: <UserStar size={20} />,
    },
    {
      label: t('gameChangersTalentPlanning'),
      value: 'talent-planning',
      href: ROUTES.GAME_CHANGERS_TALENT_PLANNING,
      icon: <UserCheck size={20} />,
    },
  ]

  return <LayoutTabSection sections={sections}>{children}</LayoutTabSection>
}
