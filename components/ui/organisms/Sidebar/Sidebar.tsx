'use client'

import { Bell, ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { cn } from '@/utils/cn'
import { SidebarNav } from '@/components/ui/molecules/SidebarNav'
import { SidebarNavItem } from '@/components/ui/molecules/SidebarNavItem'
import { GameChangersIcon, TeamIcon } from '@/components/ui/foundations/Icons'
import type { SidebarProps } from './Sidebar.types'
import { ROUTES } from '@/common/routes'
import { useUserStore } from '@/stores/user.store'

/**
 * Sidebar - Application sidebar with navigation items
 * Supports collapsed state, mobile drawer mode, and custom theming
 */
export function Sidebar({
  isCollapsed = false,
  onToggle,
  onNavigate,
  hideLogo = false,
  hideToggle = false,
  hideBorder = false,
  noPadding = false,
  'data-test-id': dataTestId,
}: SidebarProps) {
  const t = useTranslations('Sidebar')
  const { user } = useUserStore()

  return (
    <aside
      role="complementary"
      aria-label={t('mainNavigation')}
      data-collapsed={isCollapsed}
      className={cn(
        'flex flex-col h-full overflow-hidden',
        'bg-neutral-0',
        !hideBorder && 'border-r border-neutral-300',
        'transition-[width] duration-slow ease-out',
        'data-[collapsed=true]:w-sidebar-collapsed data-[collapsed=false]:w-sidebar',
      )}
      data-test-id={dataTestId}
    >
      {/* Top Section: Logo + Toggle Button */}
      <div className="flex flex-col items-center gap-3 pt-1_5 pb-0">
        {/* Logo */}
        {!hideLogo && (
          <div className="flex items-center justify-center">
            <Image
              src="/playstation-logo.svg"
              alt="PlayStation"
              width={61}
              height={48}
              className="text-neutral-1000 flex-shrink-0"
              priority
            />
          </div>
        )}

        {/* Toggle Button */}
        {!hideToggle && onToggle && (
          <div className="w-full px-1_5">
            <button
              type="button"
              onClick={onToggle}
              aria-label={isCollapsed ? t('expandSidebar') : t('collapseSidebar')}
              className={cn(
                'flex items-center',
                'h-3',
                'transition-colors duration-fast',
                'rounded-default',
                'text-neutral-1000',
                'transition-hover',
                'hover:bg-neutral-200',
                'cursor-pointer',
                isCollapsed
                  ? 'justify-center w-full'
                  : 'justify-start px-1 gap-0_5 w-full max-w-[var(--nav-item-max-width)]',
              )}
            >
              {isCollapsed ? (
                <ArrowRight size={20} aria-hidden="true" />
              ) : (
                <>
                  <ArrowLeft size={20} aria-hidden="true" />
                  <span className="text-body-small leading-body-small font-semibold">
                    {t('closeMenu')}
                  </span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <div
        className={cn('flex-1 overflow-y-visible overflow-x-hidden', !noPadding && 'px-1_5 py-1_5')}
      >
        <SidebarNav isCollapsed={isCollapsed}>
          {/* <SidebarNavItem
            icon={<DashboardIcon className="w-5 h-5" />}
            label={t('home')}
            isCollapsed={isCollapsed}
            href={ROUTES.ROOT}
            onClick={onNavigate}
          /> */}
          <SidebarNavItem
            icon={<GameChangersIcon className="w-5 h-5" />}
            label={t('gameChangers')}
            isCollapsed={isCollapsed}
            href={ROUTES.GAME_CHANGERS}
            onClick={onNavigate}
          />
          <SidebarNavItem
            icon={<TeamIcon className="w-5 h-5" />}
            label={t('myTeam')}
            isCollapsed={isCollapsed}
            href={ROUTES.TEAM}
            onClick={onNavigate}
          />
        </SidebarNav>
      </div>

      {/* Bottom Section */}
      <div className={cn(!noPadding && 'px-1_5 py-1_5')}>
        {/* Bottom Navigation */}
        <SidebarNav isCollapsed={isCollapsed}>
          <SidebarNavItem
            icon={<Bell size={20} />}
            label={t('notifications')}
            isCollapsed={isCollapsed}
            href={ROUTES.NOTIFICATIONS}
            onClick={onNavigate}
          />
          <SidebarNavItem
            icon={
              <Image
                src={`/profile-img/${user?.profileImageUrl || 'profile.png'}`}
                alt={`${user?.name} ${user?.lastname}`.trim() || t('profile')}
                className="w-5 h-5 rounded-full object-cover"
                width={24}
                height={24}
              />
            }
            label={`${user?.name} ${user?.lastname}`.trim() || t('profile')}
            isCollapsed={isCollapsed}
            href={ROUTES.PROFILE}
            onClick={onNavigate}
          />
        </SidebarNav>
      </div>
    </aside>
  )
}
