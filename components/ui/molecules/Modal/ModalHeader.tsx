'use client'

import { cn } from '@/utils/cn'
import { X } from 'lucide-react'

import type { ModalHeaderProps } from './Modal.types'

export function ModalHeader({
  beforeTitle,
  children,
  showClose = true,
  onClose,
  className,
}: ModalHeaderProps) {
  return (
    <header className={cn('flex flex-col gap-1', className)}>
      {showClose && (
        <button
          aria-label="Close"
          type="button"
          onClick={onClose}
          className=" w-[24px] h-[24px] absolute right-1 top-1 inline-flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted cursor-pointer"
        >
          <X width={20} />
        </button>
      )}
      {beforeTitle && beforeTitle}
      {children && (
        <div
          role="heading"
          aria-level={5}
          tabIndex={0}
          className="text-h5 leading-h5 font-semibold"
        >
          {children}
        </div>
      )}
    </header>
  )
}

export default ModalHeader
