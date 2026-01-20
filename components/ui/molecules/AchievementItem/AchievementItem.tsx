'use client'

import { AnimatePresence, m } from 'framer-motion'
import { Checkbox } from '@/components/ui/atoms/Checkbox'
import { Typography } from '@/components/ui/foundations/Typography'
import { cn } from '@/utils/cn'
import type { AchievementItemProps, ProgressStatus } from './AchievementItem.types'

const progressVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

const progressControlsVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -8 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -8 },
}

const progressOptions: {
  value: ProgressStatus
  label: string
  selectedBg: string
  selectedText: string
}[] = [
  {
    value: 'not-started',
    label: 'Not started',
    selectedBg: 'bg-neutral-200',
    selectedText: 'text-neutral-700',
  },
  {
    value: 'on-track',
    label: 'On Track',
    selectedBg: 'bg-extra-blue-100',
    selectedText: 'text-extra-blue-600',
  },
  {
    value: 'off-track',
    label: 'Off Track',
    selectedBg: 'bg-feedback-danger-100',
    selectedText: 'text-feedback-danger-600',
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
        'flex items-center gap-1_5 rounded-default border border-solid',
        'p-1_5',
        !isMobile && 'h-[92px]',
        completed
          ? 'bg-feedback-success-100 border-feedback-success-200'
          : 'bg-neutral-0 border-neutral-200',
        isMobile && 'flex-col items-center',
        className,
      )}
      data-testid={dataTestId}
      style={{
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Content wrapper */}
      <div className={cn('flex items-center gap-0_5 flex-1 min-w-0', isMobile && 'w-full')}>
        {/* Checkbox */}
        <label className="flex items-center gap-0_5 cursor-pointer flex-1 min-w-0">
          <Checkbox
            checked={completed}
            onCheckedChange={(checked) => onToggle?.(checked === true)}
            aria-label={text}
            className="cursor-pointer"
          />
          <Typography
            variant="body"
            color="neutral1000"
            className={cn('flex-1', isMobile && 'text-sm')}
          >
            {text}
          </Typography>
        </label>
      </div>

      {/* Progress selector - only show when NOT completed */}
      <AnimatePresence mode="wait">
        {!completed && showProgressSelector && (
          <m.div
            key="progress-controls"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={progressControlsVariants}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex gap-0_25 shrink-0 bg-neutral-100 rounded-full p-0_25"
            role="radiogroup"
            aria-label="Progress status"
          >
            {progressOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onProgressChange?.(option.value)}
                className={cn(
                  'py-0_5 px-1 rounded-full font-semibold transition-all whitespace-nowrap cursor-pointer',
                  'text-sm leading-[20px]',
                  progress === option.value
                    ? cn(option.selectedBg, option.selectedText)
                    : 'text-neutral-600',
                )}
                aria-label={option.label}
                aria-checked={progress === option.value}
                role="radio"
              >
                {option.label}
              </button>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  )
}

AchievementItem.displayName = 'AchievementItem'
