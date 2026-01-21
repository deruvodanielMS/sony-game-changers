'use client'

import { useTranslations } from 'next-intl'
import { CollapsibleSection } from '@/components/ui/molecules/CollapsibleSection'
import { Typography } from '@/components/ui/foundations/Typography'
import { cn } from '@/utils/cn'
import type { AmbitionActionsProps } from './AmbitionActions.types'

// Bullet point design tokens
const BULLET_SIZE = '6px' // Small circular bullet point size
const BULLET_VERTICAL_OFFSET = '9px' // Aligns bullet with first line of text (body font line-height compensation)

export function AmbitionActions({ actions, defaultOpen = true, className }: AmbitionActionsProps) {
  const t = useTranslations('AmbitionDetail.actions')

  return (
    <CollapsibleSection title={t('title')} defaultOpen={defaultOpen} className={className}>
      {actions.map((action, index) => (
        <div
          key={index}
          className="border-b border-neutral-200 flex items-start gap-1 w-full last:border-b-0 py-1 pl-0_5"
        >
          {/* Bullet point */}
          <div
            className="rounded-full bg-neutral-800 shrink-0"
            style={{ width: BULLET_SIZE, height: BULLET_SIZE, marginTop: BULLET_VERTICAL_OFFSET }}
          />

          {/* Action text */}
          <Typography variant="body" color="default" className="flex-1">
            {action}
          </Typography>
        </div>
      ))}
    </CollapsibleSection>
  )
}
