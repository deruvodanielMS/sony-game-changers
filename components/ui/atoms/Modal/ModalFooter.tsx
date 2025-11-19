'use client'

import { cn } from '@/utils/cn'
import type { ModalFooterProps } from './Modal.types'

export function ModalFooter({ children, className }: ModalFooterProps) {
  return <footer className={cn('flex items-center gap-1', className)}>{children}</footer>
}

export default ModalFooter
