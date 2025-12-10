'use client'

import { cn } from '@/utils/cn'
import type { ModalBodyProps } from './Modal.types'

export function ModalBody({ children, className }: ModalBodyProps) {
  return (
    <div tabIndex={0} className={cn('text-body leading-body text-neutral-1000', className)}>
      {children}
    </div>
  )
}

export default ModalBody
