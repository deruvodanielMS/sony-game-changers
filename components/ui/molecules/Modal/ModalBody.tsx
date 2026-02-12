'use client'

import { cn } from '@/utils/cn'
import type { ModalBodyProps } from './Modal.types'

export function ModalBody({ children, className }: ModalBodyProps) {
  return (
    <div
      className={cn(
        'text-body leading-body text-neutral-1000 w-full flex-1 overflow-y-auto',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default ModalBody
