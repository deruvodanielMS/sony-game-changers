'use client'

import { cn } from '@/utils/cn'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/atoms/Button'
import { Typography } from '@/components/ui/foundations/Typography'

import type { ModalHeaderProps } from './Modal.types'

export function ModalHeader({
  beforeTitle,
  children,
  showClose = true,
  onClose,
  className,
}: ModalHeaderProps) {
  return (
    <header className={cn('flex flex-col gap-1 pt-2_5 pr-4 pb-1_5 pl-4', className)}>
      {beforeTitle && beforeTitle}
      {children && (
        <div className="flex items-start justify-between gap-1">
          <Typography variant="h3" tabIndex={0}>
            {children}
          </Typography>
          {showClose && (
            <Button
              variant="link"
              iconOnly
              onClick={onClose}
              aria-label="Close"
              className="w-3 h-3 shrink-0"
            >
              <X width={32} />
            </Button>
          )}
        </div>
      )}
    </header>
  )
}

export default ModalHeader
