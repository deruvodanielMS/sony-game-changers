'use client'

import { X, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/utils/cn'
import { Card } from '@/components/ui/atoms/Card'
import { Button } from '@/components/ui/atoms/Button'
import { Typography } from '@/components/ui/foundations/Typography'
import type { ManagerAmbitionsProps } from './ManagerAmbitions.types'

/**
 * ManagerAmbitions - Card showing manager's business ambitions that may interest the user
 * Displays a dismissible card with a list of ambitions and "Add laddered Ambition" buttons
 */
export function ManagerAmbitions({
  title,
  ambitions,
  onAddLaddered,
  onDismiss,
  className,
  'data-testid': dataTestId,
}: ManagerAmbitionsProps) {
  const t = useTranslations('ManagerAmbitions')

  if (ambitions.length === 0) {
    return null
  }

  return (
    <Card className={cn('p-1_5 flex flex-col gap-1', className)} data-testid={dataTestId}>
      {/* Header */}
      <div className="flex justify-between items-center gap-1_5">
        <Typography variant="h5" fontWeight="semibold" className="text-neutral-1000 flex-1">
          {title}
        </Typography>
        <button
          type="button"
          onClick={onDismiss}
          className="w-2 h-2 p-0_25 rounded-full flex justify-center items-center hover:bg-neutral-100 transition-colors cursor-pointer"
          aria-label={t('dismiss')}
        >
          <X className="w-1 h-1 text-neutral-1000" />
        </button>
      </div>

      {/* Ambitions List */}
      <div className="flex flex-col">
        {ambitions.map((ambition) => (
          <div key={ambition.id} className="flex justify-between items-center gap-1_5 py-0_5">
            <Typography variant="body" className="text-neutral-1000 flex-1 line-clamp-1">
              {ambition.title}
            </Typography>
            <Button
              variant="link"
              size="small"
              leftIcon={<Plus className="w-1_5 h-1_5" />}
              onClick={() => onAddLaddered(ambition.id)}
              className="shrink-0"
            >
              {t('addLadderedAmbition')}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}

ManagerAmbitions.displayName = 'ManagerAmbitions'
