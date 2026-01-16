'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { CollapsibleSection } from '@/components/ui/molecules/CollapsibleSection'
import { Typography } from '@/components/ui/foundations/Typography'
import { cn } from '@/utils/cn'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import type { AmbitionActionsProps } from './AmbitionActions.types'

export function AmbitionActions({ actions, defaultOpen = true, className }: AmbitionActionsProps) {
  const t = useTranslations('AmbitionDetail.actions')
  const isMobile = !useMediaQuery(BREAKPOINTS.md)
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={className}>
      <CollapsibleSection title={t('title')} open={isOpen} onToggle={setIsOpen}>
        {actions.map((action, index) => (
          <div
            key={index}
            className={cn(
              'border-b border-solid border-neutral-200 flex items-center w-full last:border-b-0',
              isMobile ? 'gap-0.5 px-0.75 py-0.5 min-h-12' : 'gap-0.625 h-3.5 px-1 py-0.5',
            )}
          >
            {/* Bullet point */}
            <div className="size-0.375 rounded-full bg-neutral-1000 shrink-0" />

            {/* Action text */}
            <Typography
              variant="body"
              className={cn('text-neutral-1000 flex-1', isMobile && 'text-sm')}
            >
              {action}
            </Typography>
          </div>
        ))}
      </CollapsibleSection>
    </div>
  )
}
