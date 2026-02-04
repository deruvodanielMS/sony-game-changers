import Image from 'next/image'
import { ArrowProps } from './Arrow.types'
import { cn } from '@/utils/cn'

const ARROW_CONFIG = {
  'Higher top': {
    src: '/Icons/Type=HigherTop.svg',
    width: 32,
    height: 16,
  },
  'Higher bottom': {
    src: '/Icons/Type=HigherBottom.svg',
    width: 32,
    height: 32,
  },
  'Laddered top': {
    src: '/Icons/Type=LadderedTop.svg',
    width: 48,
    height: 48,
  },
  'Laddered middle': {
    src: '/Icons/Type=LadderedMiddle.svg',
    width: 48,
    height: 48,
  },
  'Laddered bottom': {
    src: '/Icons/Type=LadderedBottom.svg',
    width: 48,
    height: 48,
  },
} as const

export function Arrow({ className, type = 'Higher top', 'data-testid': dataTestId }: ArrowProps) {
  const config = ARROW_CONFIG[type]

  return (
    <div className={cn('flex items-center justify-center', className)} data-testid={dataTestId}>
      <Image
        src={encodeURI(config.src)}
        alt={type}
        width={config.width}
        height={config.height}
        className="object-contain"
        aria-hidden="true"
        unoptimized
      />
    </div>
  )
}
