import { useTranslations } from 'next-intl'
import { cn } from '@/utils/cn'
import type { GoalStatus } from '@/domain/goal'

// This component will display the status of a goal, such as "completed", "draft", or "awaiting approval".

export function GoalStatus({ status, className }: { status: GoalStatus; className: string }) {
  const t = useTranslations('Goals')

  const statusClasses = {
    completed: 'text-goal-completed',
    draft: 'text-goal-draft',
    awaiting_approval: 'text-goal-awaiting-approval',
  }

  return (
    <span className={cn('text-body leading-body', statusClasses[status], className)}>
      {t(`status.${status}`)}
    </span>
  )
}
