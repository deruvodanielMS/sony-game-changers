'use client'

import { m } from 'framer-motion'
import { Checkbox } from '@/components/ui/atoms/Checkbox'
import { Typography } from '@/components/ui/foundations/Typography'
import { cn } from '@/utils/cn'
import type { AchievementItemProps, ProgressStatus } from './AchievementItem.types'

const progressVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

const progressOptions: { value: ProgressStatus; label: string; color: string }[] = [
  { value: 'not-started', label: 'Not Started', color: 'bg-neutral-200 hover:bg-neutral-300' },
  { value: 'on-track', label: 'On Track', color: 'bg-extra-green-200 hover:bg-extra-green-300' },
  {
    value: 'off-track',
    label: 'Off Track',
    color: 'bg-feedback-error-200 hover:bg-feedback-error-300',
  },
]

/**
 * AchievementItem - Checkbox-based achievement with progress tracking
 *
 * A molecule component that displays an achievement with a checkbox, optional progress selector,
 * and visual feedback for completion status. Used in achievement lists and checklists.
 *
 * @example
 * ```tsx
 * <AchievementItem
 *   text="Complete onboarding process"
 *   completed={false}
 *   progress="on-track"
 *   onToggle={(completed) => console.log(completed)}
 *   onProgressChange={(progress) => console.log(progress)}
 * />
 * ```
 */
export function AchievementItem({
  text,
  completed = false,
  progress,
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
        'flex items-center p-1.5 rounded-1 border border-solid transition-colors',
        completed ? 'bg-extra-green-100 border-extra-green-200' : 'bg-neutral-0 border-neutral-200',
        isMobile && 'flex-col items-start gap-1',
        className,
      )}
      data-testid={dataTestId}
    >
      {/* Content wrapper */}
      <div className={cn('flex items-center gap-0.5 flex-1 min-w-0', isMobile && 'w-full')}>
        {/* Checkbox */}
        <label className="flex items-center gap-0.5 cursor-pointer flex-1 min-w-0">
          <Checkbox
            checked={completed}
            onCheckedChange={(checked) => onToggle?.(checked === true)}
            aria-label={text}
          />
          <Typography
            variant="body"
            className={cn(
              'text-neutral-1000 transition-opacity flex-1',
              completed && 'line-through opacity-70',
              isMobile && 'text-sm',
            )}
          >
            {text}
          </Typography>
        </label>
      </div>

      {/* Progress selector */}
      {!completed && showProgressSelector && (
        <div
          className={cn('flex gap-0.5 shrink-0', isMobile && 'w-full justify-end')}
          role="radiogroup"
          aria-label="Progress status"
        >
          {progressOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onProgressChange?.(option.value)}
              className={cn(
                'size-1.5 rounded-full border-2 border-solid transition-all',
                progress === option.value
                  ? cn(option.color, 'border-neutral-1000 scale-110')
                  : 'bg-neutral-0 border-neutral-300 hover:border-neutral-400',
              )}
              aria-label={option.label}
              aria-checked={progress === option.value}
              role="radio"
              title={option.label}
            />
          ))}
        </div>
      )}
    </m.div>
  )
}

AchievementItem.displayName = 'AchievementItem'
