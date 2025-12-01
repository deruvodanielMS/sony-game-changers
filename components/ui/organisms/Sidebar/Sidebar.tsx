'use client'

import { LayoutGrid, UserCheck, Users, Bell, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { cn } from '@/utils/cn'
import { SidebarNav } from '@/components/ui/molecules/SidebarNav'
import { SidebarNavItem } from '@/components/ui/molecules/SidebarNavItem'
import { LanguageSwitcher } from '@/components/ui/molecules/LanguageSwitcher'
import type { SidebarProps } from './Sidebar.types'
import { ROUTES } from '@/common/routes'

/**
 * Sidebar - Application sidebar with navigation items
 * Supports collapsed state, mobile drawer mode, and custom theming
 */
export function Sidebar({
  isCollapsed = false,
  onToggle,
  hideLogo = false,
  hideToggle = false,
  hideBorder = false,
  noPadding = false,
  'data-test-id': dataTestId,
}: SidebarProps) {
  const t = useTranslations('Sidebar')

  return (
    <aside
      role="complementary"
      aria-label={t('mainNavigation')}
      className={cn(
        'flex flex-col h-full',
        'bg-neutral-0',
        !hideBorder && 'border-r border-neutral-300',
        'transition-all duration-slow ease-spring',
        isCollapsed ? 'w-sidebar-collapsed' : 'w-sidebar',
      )}
      data-test-id={dataTestId}
    >
      {/* Logo */}
      {!hideLogo && (
        <div
          className={cn(
            'flex items-center justify-center h-header',
            isCollapsed ? 'px-0_5' : 'px-1_5',
          )}
        >
          <Image
            src="/playstation-logo.svg"
            alt="PlayStation"
            width={48}
            height={48}
            className="text-neutral-1000"
            priority
          />
        </div>
      )}

      {/* Main Navigation */}
      <div
        className={cn(
          'flex-1 overflow-y-auto overflow-x-hidden',
          !noPadding && (isCollapsed ? 'px-0_5 py-1_5' : 'px-1_5 py-1_5'),
        )}
      >
        <SidebarNav isCollapsed={isCollapsed}>
          <SidebarNavItem
            icon={<LayoutGrid size={20} />}
            label={t('home')}
            isActive
            isCollapsed={isCollapsed}
            href={ROUTES.ROOT}
          />
          <SidebarNavItem
            icon={<UserCheck size={20} />}
            label={t('gameChangers')}
            isCollapsed={isCollapsed}
            href={ROUTES.GAME_CHANGERS}
          />
          <SidebarNavItem
            icon={<Users size={20} />}
            label={t('myTeam')}
            isCollapsed={isCollapsed}
            href={ROUTES.TEAM}
          />
        </SidebarNav>
      </div>

      {/* Bottom Section */}
      <div className={cn(!noPadding && (isCollapsed ? 'px-0_5 py-1_5' : 'px-1_5 py-1_5'))}>
        <div className="flex flex-col gap-1">
          {/* Language Switcher */}
          <LanguageSwitcher isCollapsed={isCollapsed} data-test-id="sidebar-language-switcher" />

          {/* Toggle Button */}
          {!hideToggle && onToggle && (
            <button
              type="button"
              onClick={onToggle}
              aria-label={isCollapsed ? t('expandSidebar') : t('collapseSidebar')}
              className={cn(
                'flex items-center w-full',
                'transition-colors duration-fast',
                'rounded-default',
                'text-body-small leading-body-small font-bold',
                'text-neutral-1000',
                'hover:bg-neutral-200',
                'cursor-pointer',
                isCollapsed ? 'justify-center p-0_5' : 'px-1 py-0_75 gap-0_5',
              )}
            >
              {isCollapsed ? (
                <ChevronRight size={20} aria-hidden="true" />
              ) : (
                <>
                  <ChevronLeft size={20} aria-hidden="true" />
                  <span className="flex-1 text-left">{t('closeMenu')}</span>
                </>
              )}
            </button>
          )}

          {/* Bottom Navigation */}
          <SidebarNav isCollapsed={isCollapsed}>
            <SidebarNavItem
              icon={<Bell size={20} />}
              label={t('notifications')}
              isCollapsed={isCollapsed}
              href={ROUTES.NOTIFICATIONS}
            />
            <SidebarNavItem
              icon={
                <Image
                  src="https://i.pravatar.cc/40?img=12"
                  alt={t('profile')}
                  className="w-5 h-5 rounded-full object-cover"
                />
              }
              label={t('profile')}
              isCollapsed={isCollapsed}
              href={ROUTES.PROFILE}
            />
          </SidebarNav>
        </div>
      </div>
    </aside>
  )
}
