'use client'

import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { useTranslations } from 'next-intl'
import { m, AnimatePresence } from 'framer-motion'
import { Grid2x2, List } from 'lucide-react'
import { ROUTES } from '@/common/routes'
import { SearchField } from '@/components/ui/molecules/SearchField'
import { EmptyState } from '@/components/ui/molecules/EmptyState'
import { TeamMemberCard } from '@/components/team/TeamMemberCard'
import { Typography } from '@/components/ui/foundations/Typography'
import { Avatar } from '@/components/ui/atoms/Avatar'
import { Switcher } from '@/components/ui/molecules/Switcher'
import { SectionHeader } from '@/components/ui/organisms/SectionHeader'
import { cn } from '@/utils/cn'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import { useRouter } from '@/i18n/navigation'
import type { TeamViewProps, ViewMode } from './TeamView.types'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

/**
 * TeamView - Displays team members in grid or list view
 *
 * Includes filtering by search, with view mode toggle.
 *
 * @example
 * ```tsx
 * <TeamView members={teamMembers} />
 * ```
 */
export function TeamView({ members = [], className, 'data-testid': dataTestId }: TeamViewProps) {
  const t = useTranslations('Team')
  const router = useRouter()

  // Media queries must be called unconditionally
  const matchesMd = useMediaQuery(BREAKPOINTS.md)
  const matchesLg = useMediaQuery(BREAKPOINTS.lg)
  const isMobile = !matchesMd
  const isTablet = matchesMd && !matchesLg

  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  const handleMemberClick = (uid: string) => {
    router.push(ROUTES.TEAM_MEMBER_DETAIL(uid))
  }

  const handleMemberRowKeyDown = (event: KeyboardEvent<HTMLDivElement>, uid: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleMemberClick(uid)
    }
  }

  // Filter members based on search
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      searchQuery === '' ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.role?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)

    return matchesSearch
  })

  return (
    <div className={cn('flex flex-col gap-1 w-full', className)} data-testid={dataTestId}>
      {/* Header Section */}
      <SectionHeader title={t('title')} description={t('description')} />

      {/* Subtitle + Filters */}
      <div
        className={cn(
          'flex w-full gap-1.5',
          isMobile ? 'flex-col items-stretch' : 'flex-row items-center justify-between',
        )}
      >
        <Typography variant="h6" fontWeight="semibold" className="shrink-0">
          {t('teamMembers')}
        </Typography>

        <div className={cn('flex items-center gap-1.5', isMobile && 'flex-col gap-1 w-full')}>
          {/* Search Field */}
          <SearchField
            className={cn(isMobile ? 'w-full' : isTablet ? 'w-50' : 'w-70')}
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={setSearchQuery}
          />

          {/* View Toggle Switcher */}
          {!isMobile && (
            <Switcher
              ariaLabel={t('viewSwitcherLabel')}
              size="large"
              variant="generic"
              value={viewMode}
              onChange={(value) => setViewMode(value as ViewMode)}
              items={[
                {
                  id: 'grid',
                  icon: <Grid2x2 className="size-full" />,
                  ariaLabel: t('viewGrid'),
                },
                {
                  id: 'list',
                  icon: <List className="size-full" />,
                  ariaLabel: t('viewList'),
                },
              ]}
            />
          )}
        </div>
      </div>

      {/* Team Members - Grid or List View */}
      {filteredMembers.length === 0 ? (
        <EmptyState
          variant="compact"
          title={t('emptyState.title')}
          description={t('emptyState.description')}
        />
      ) : (
        <AnimatePresence mode="wait">
          {(viewMode === 'grid' || isMobile) && (
            <m.div
              key={`grid-view-${filteredMembers.map((m) => m.uid).join('-')}`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={listVariants}
              className={cn(
                'grid w-full gap-1',
                isMobile && 'grid-cols-2',
                isTablet && 'grid-cols-3',
                !isMobile && !isTablet && 'grid-cols-4',
              )}
            >
              {filteredMembers.map((member) => (
                <m.div key={member.uid} variants={cardVariants} transition={{ duration: 0.3 }}>
                  <TeamMemberCard
                    name={member.name}
                    avatarUrl={member.url}
                    role={member.role}
                    className="h-full"
                    onClick={() => handleMemberClick(member.uid)}
                  />
                </m.div>
              ))}
            </m.div>
          )}

          {viewMode === 'list' && !isMobile && (
            <m.div
              key={`list-view-${filteredMembers.map((m) => m.uid).join('-')}`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={listVariants}
              className="flex flex-col w-full bg-neutral-0 border border-neutral-300 rounded-large overflow-hidden"
            >
              {/* Table Header */}
              <div className="grid grid-cols-[200px_1fr] gap-1.5 px-1.5 py-1 bg-neutral-100 border-b border-neutral-300">
                <Typography variant="bodySmall" fontWeight="bold" className="uppercase">
                  {t('columnName')}
                </Typography>
                <Typography variant="bodySmall" fontWeight="bold" className="uppercase">
                  {t('columnRole')}
                </Typography>
              </div>

              {/* Table Rows */}
              {filteredMembers.map((member, index) => (
                <m.div
                  key={member.uid}
                  variants={cardVariants}
                  className={cn(
                    'grid grid-cols-[200px_1fr] gap-1.5 px-1.5 py-1 items-center cursor-pointer hover:bg-neutral-100 transition-colors',
                    index !== filteredMembers.length - 1 && 'border-b border-neutral-300',
                  )}
                  onClick={() => handleMemberClick(member.uid)}
                  onKeyDown={(event) => handleMemberRowKeyDown(event, member.uid)}
                  role="button"
                  tabIndex={0}
                >
                  {/* Name column with avatar */}
                  <div className="flex gap-1 items-center">
                    <Avatar src={member.url} alt={member.name} size="lg" />
                    <Typography variant="body" fontWeight="bold" className="truncate">
                      {member.name}
                    </Typography>
                  </div>

                  {/* Role column */}
                  <Typography variant="body" color="textSecondary" className="truncate">
                    {member.role || '-'}
                  </Typography>
                </m.div>
              ))}
            </m.div>
          )}
        </AnimatePresence>
      )}

      {/* Footer - Total Count */}
      <div className="flex items-center justify-end w-full">
        <Typography variant="bodySmall" color="textSecondary">
          {t('totalMembers', { count: filteredMembers.length })}
        </Typography>
      </div>
    </div>
  )
}

TeamView.displayName = 'TeamView'
