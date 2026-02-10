'use client'

import { cn } from '@/utils/cn'
import type { ModalBodyProps } from './Modal.types'

export function ModalBody({ children, className }: ModalBodyProps) {
  return (
    <div
      tabIndex={0}
      className={cn(
        'text-body leading-body text-neutral-1000 px-4 py-1_5 gap-2 flex-1 overflow-y-auto',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default ModalBody
