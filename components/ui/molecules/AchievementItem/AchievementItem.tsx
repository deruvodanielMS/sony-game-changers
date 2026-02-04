'use client'

import { m } from 'framer-motion'
import { Typography } from '@/components/ui/foundations/Typography'
import { Switcher } from '@/components/ui/molecules/Switcher'
import { cn } from '@/utils/cn'
import type { AchievementItemProps, ProgressStatus } from './AchievementItem.types'
import type { SwitcherVariant } from '@/components/ui/molecules/Switcher'

const progressVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

const progressOptions: {
  id: Exclude<ProgressStatus, null>
  label: string
  variant: SwitcherVariant
}[] = [
  {
    id: 'off-track',
    label: 'Off track',
    variant: 'error',
  },
  {
    id: 'on-track',
    label: 'On track',
    variant: 'info',
  },
  {
    id: 'not-started',
    label: 'Done',
    variant: 'success',
  },
]

/**
 * AchievementItem - Achievement with progress status selector
 *
 * A molecule component that displays an achievement with a three-state progress selector.
 * Users can select: Off track, On track, or Done.
 *
 * @example
 * ```tsx
 * <AchievementItem
 *   text="Complete onboarding process"
 *   progress="on-track"
 *   onProgressChange={(progress) => console.log(progress)}
 * />
 * ```
 */
export function AchievementItem({
  text,
  completed = false,
  progress = 'off-track',
  onToggle,
  onProgressChange,
  showProgressSelector = true,
  size = 'md',
  className,
  'data-test-id': dataTestId,
}: AchievementItemProps) {
  const isMobile = size === 'sm'

  return (
    <m.div
      initial="hidden"
      animate="visible"
      variants={progressVariants}
      transition={{ duration: 0.2 }}
      className={cn(
        'flex items-center justify-between gap-1 rounded-default border border-neutral-200',
        'bg-neutral-0 p-1',
        isMobile && 'flex-col items-start',
        className,
      )}
      data-testid={dataTestId}
    >
      {/* Achievement text */}
      <Typography
        variant="body"
        color="default"
        className={cn('flex-1', isMobile && 'text-sm w-full')}
      >
        {text}
      </Typography>

      {/* Progress selector */}
      {showProgressSelector && (
        <Switcher
          items={progressOptions}
          value={progress || 'off-track'}
          onChange={(value) => onProgressChange?.(value as ProgressStatus)}
          size="small"
          variant={progressOptions.find((opt) => opt.id === progress)?.variant || 'generic'}
          ariaLabel="Progress status"
          className="shrink-0"
        />
      )}
    </m.div>
  )
}

AchievementItem.displayName = 'AchievementItem'
