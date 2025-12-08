'use client'

import { useTranslations } from 'next-intl'
import { cn } from '@/utils/cn'
import type { ModalFooterProps } from './Modal.types'
import { Button } from '@/components/ui/atoms/Button'

export function ModalFooter({ className, onConfirm, onCancel }: ModalFooterProps) {
  const t = useTranslations('Common')
  return (
    <footer className={cn('flex items-center gap-1', className)}>
      <Button variant={'primary'} onClick={onConfirm} className="text-neutral-0">
        {t('confirm')}
      </Button>
      <Button variant={'secondary'} onClick={onCancel}>
        {t('cancel')}
      </Button>
    </footer>
  )
}

export default ModalFooter
