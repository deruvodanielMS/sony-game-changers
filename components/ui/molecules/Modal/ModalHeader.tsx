'use client'

import { cn } from '@/utils/cn'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/atoms/Button'
import { Typography } from '@/components/ui/foundations/Typography'

import type { ModalHeaderProps } from './Modal.types'

export function ModalHeader({ children, showClose = true, onClose, className }: ModalHeaderProps) {
  const t = useTranslations('Common')
  return (
    <header className={cn('flex flex-col gap-1 w-full', className)}>
      {showClose && (
        <Button
          variant="link"
          iconOnly
          size="small"
          onClick={onClose}
          aria-label={t('close')}
          className="absolute right-1 top-1"
        >
          <X size={20} />
        </Button>
      )}
      {children && (
        <Typography variant="h4" className="font-bold">
          {children}
        </Typography>
      )}
    </header>
  )
}

export default ModalHeader
