'use client'

import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/atoms/Button'
import type { MobileHeaderProps } from './MobileHeader.types'

/**
 * MobileHeader - Header component for mobile devices with logo and hamburger menu
 * Follows a11y guidelines with proper landmarks and ARIA attributes
 */
export function MobileHeader({
  onMenuClick,
  menuOpen,
  'data-test-id': dataTestId,
}: MobileHeaderProps) {
  const t = useTranslations('MobileHeader')

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 z-[var(--z-mobile-header)] h-header bg-neutral-0 border-b border-neutral-300 px-1 flex items-center justify-between"
      data-test-id={dataTestId}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/playstation-logo.svg"
          alt={t('playStationHome')}
          width={60}
          height={15}
          priority
        />
      </div>

      {/* Navigation Menu Button */}
      <Button
        onClick={onMenuClick}
        variant={menuOpen ? 'tertiary' : 'plain'}
        size="small"
        iconOnly
        iconShape="rounded"
        aria-label={menuOpen ? t('closeNavigationMenu') : t('openNavigationMenu')}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation-drawer"
      >
        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>
    </header>
  )
}

MobileHeader.displayName = 'MobileHeader'
