import Image from 'next/image'
import { ArrowProps } from './Arrow.types'
import { cn } from '@/utils/cn'

const ARROW_CONFIG = {
  'Higher top': {
    src: '/Icons/Type=Higher top.svg',
    width: 32,
    height: 16,
  },
  'Higher bottom': {
    src: '/Icons/Type=Higher bottom.svg',
    width: 32,
    height: 32,
  },
  'Laddered top': {
    src: '/Icons/Type=Laddered top.svg',
    width: 48,
    height: 48,
  },
  'Laddered middle': {
    src: '/Icons/Type=Laddered middle.svg',
    width: 48,
    height: 48,
  },
  'Laddered bottom': {
    src: '/Icons/Type=Laddered bottom.svg',
    width: 48,
    height: 48,
  },
} as const

export function Arrow({ className, type = 'Higher top', 'data-testid': dataTestId }: ArrowProps) {
  const config = ARROW_CONFIG[type]

  return (
    <div className={cn('flex items-center justify-center', className)} data-testid={dataTestId}>
      <Image
        src={config.src}
        alt=""
        width={config.width}
        height={config.height}
        className="object-contain"
      />
    </div>
  )
}
