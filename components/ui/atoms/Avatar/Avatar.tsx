'use client'

import Image from 'next/image'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { generateInitialsAvatarSrc } from '@/utils/generateInitialsAvatar'
import type { AvatarProps } from './Avatar.types'

const avatarVariants = cva('relative overflow-hidden shrink-0 rounded-full', {
  variants: {
    size: {
      xs: 'size-1',
      sm: 'size-1_5',
      md: 'size-2',
      lg: 'size-3',
      xl: 'size-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type AvatarVariants = VariantProps<typeof avatarVariants>

function getPixelSize(size: AvatarProps['size']): number {
  if (typeof size === 'number') return size

  const sizeMap = {
    xs: 16,
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
  }

  return sizeMap[size || 'md']
}

/**
 * Avatar - Display user profile pictures or initials
 *
 * A versatile component for showing user avatars with automatic fallback to initials.
 * Uses Next.js Image for optimization.
 *
 * @example
 * ```tsx
 * <Avatar src="/user.jpg" alt="John Doe" />
 * <Avatar alt="Jane Smith" /> // Shows initials
 * <Avatar src="/user.jpg" alt="User" size="lg" />
 * ```
 */
export function Avatar({
  src,
  alt = 'Avatar',
  size = 'md',
  fallback,
  className,
  'data-test-id': dataTestId,
}: AvatarProps) {
  const pixelSize = getPixelSize(size)
  const borderRadius = pixelSize / 2
  const imageSrc =
    src || (fallback ? null : generateInitialsAvatarSrc(alt, { size: pixelSize, borderRadius }))

  const sizeClass = typeof size === 'number' ? undefined : size

  return (
    <div
      className={cn(avatarVariants({ size: sizeClass }), className)}
      style={typeof size === 'number' ? { width: size, height: size } : undefined}
      data-testid={dataTestId}
      title={alt}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={alt}
          width={pixelSize}
          height={pixelSize}
          className="size-full object-cover"
        />
      ) : (
        <div className="flex items-center justify-center size-full bg-neutral-200 text-neutral-800">
          {fallback}
        </div>
      )}
    </div>
  )
}

Avatar.displayName = 'Avatar'
