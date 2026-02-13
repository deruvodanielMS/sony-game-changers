'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { m, AnimatePresence } from 'framer-motion'
import { Plus, Grid2x2, List } from 'lucide-react'
import { SearchField } from '@/components/ui/molecules/SearchField'
import { AvatarSelect } from '@/components/ui/molecules/AvatarSelect'
import { EmptyState } from '@/components/ui/molecules/EmptyState'
import { Typography } from '@/components/ui/foundations/Typography'
import { Button } from '@/components/ui/atoms/Button'
import { AmbitionStatus } from '@/components/ui/atoms/AmbitionStatus'
import {
  getStatusVariant,
  getStatusLabel,
  shouldShowProgress,
  getProgressVariant,
} from '@/components/ui/atoms/AmbitionStatus/AmbitionStatus.types'
import { Switcher } from '@/components/ui/molecules/Switcher'
import { cn } from '@/utils/cn'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import { ROUTES } from '@/common/routes'
import type { AmbitionLadderingProps, LadderedAmbition, ViewMode } from './AmbitionLaddering.types'

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

export function AmbitionLaddering({
  ambitions = [],
  avatarOptions,
  onAddAmbition,
  className,
}: AmbitionLadderingProps) {
  const t = useTranslations('AmbitionDetail.ladderedAmbitions')

  // Media queries must be called unconditionally
  const matchesMd = useMediaQuery(BREAKPOINTS.md)
  const matchesLg = useMediaQuery(BREAKPOINTS.lg)
  const isMobile = !matchesMd
  const isTablet = matchesMd && !matchesLg

  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selectedAvatars, setSelectedAvatars] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  // Filter ambitions based on search and avatar selection
  const filteredAmbitions = ambitions.filter((ambition: LadderedAmbition) => {
    const matchesSearch =
      searchQuery === '' ||
      ambition.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ambition.userName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesAvatar =
      selectedAvatars.length === 0 || selectedAvatars.includes(ambition.uid || '')

    return matchesSearch && matchesAvatar
  })

  return (
    <div className={cn('flex flex-col gap-1 w-full', className)}>
      {/* Title + Filters */}
      <div
        className={cn(
          'flex w-full gap-1.5',
          isMobile ? 'flex-col items-stretch' : 'flex-row items-center justify-between',
        )}
      >
        <Typography variant="h6" fontWeight="semibold" className="shrink-0">
          {t('title')}
        </Typography>

        <div className={cn('flex items-center gap-1.5', isMobile && 'flex-col gap-1 w-full')}>
          {/* Search Field */}
          <SearchField
            className={cn(isMobile ? 'w-full' : isTablet ? 'w-50' : 'w-70')}
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={setSearchQuery}
          />

          {/* Avatar Filter */}
          {avatarOptions && avatarOptions.length > 0 && (
            <AvatarSelect
              options={avatarOptions}
              selected={selectedAvatars}
              onAvatarSelect={setSelectedAvatars}
              showItems={isMobile ? 3 : isTablet ? 3 : 5}
            />
          )}

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

      {/* Laddered Ambitions - Grid or List View */}
      {filteredAmbitions.length === 0 ? (
        <EmptyState
          variant="compact"
          title={t('emptyState.title')}
          description={t('emptyState.description')}
        />
      ) : (
        <AnimatePresence mode="wait">
          {(viewMode === 'grid' || isMobile) && (
            <m.div
              key="grid-view"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={listVariants}
              className={cn(
                'grid w-full gap-1',
                isMobile && 'grid-cols-1',
                isTablet && 'grid-cols-2',
                !isMobile && !isTablet && 'grid-cols-3',
              )}
            >
              {filteredAmbitions.map((ambition) => (
                <Link
                  key={ambition.id}
                  href={ROUTES.GAME_CHANGERS_AMBITIONS_DETAIL(ambition.id)}
                  className="block"
                >
                  <m.div
                    variants={cardVariants}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-1 bg-neutral-0 border border-neutral-300 rounded-large p-1.5 cursor-pointer hover:border-neutral-400 transition-colors h-full"
                  >
                    {/* Title */}
                    <Typography
                      variant="body"
                      className="h-3 overflow-hidden text-ellipsis line-clamp-2"
                    >
                      {ambition.title}
                    </Typography>

                    {/* Employee + Progress */}
                    <div className="flex gap-1 items-center w-full">
                      {/* Employee Info */}
                      <div className="flex-1 flex gap-1 items-center min-w-0">
                        <div className="relative size-3 rounded-full shrink-0 overflow-hidden">
                          <Image
                            src={ambition.avatarUrl || '/profile-img/default.png'}
                            alt={ambition.userName}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <Typography
                          variant="body"
                          fontWeight="bold"
                          className="overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {ambition.userName}
                        </Typography>
                      </div>

                      {/* Progress or Status - based on ambition status */}
                      {shouldShowProgress(ambition.status) ? (
                        <AmbitionStatus
                          variant={getProgressVariant(ambition.status, ambition.progress)}
                          showProgress
                          progress={ambition.progress}
                          size="sm"
                          className="w-25 shrink-0"
                        />
                      ) : (
                        <AmbitionStatus
                          variant={getStatusVariant(ambition.status)}
                          size="sm"
                          className="shrink-0"
                        >
                          {getStatusLabel(ambition.status)}
                        </AmbitionStatus>
                      )}
                    </div>
                  </m.div>
                </Link>
              ))}
            </m.div>
          )}

          {viewMode === 'list' && !isMobile && (
            <m.div
              key="list-view"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={listVariants}
              className="flex flex-col w-full bg-neutral-0 border border-neutral-300 rounded-large overflow-hidden"
            >
              {/* Table Header */}
              <div className="grid grid-cols-[200px_1fr_140px] gap-1.5 px-1.5 py-1 bg-neutral-100 border-b border-neutral-300">
                <Typography variant="bodySmall" fontWeight="bold" className="uppercase">
                  NAME
                </Typography>
                <Typography variant="bodySmall" fontWeight="bold" className="uppercase">
                  AMBITION
                </Typography>
                <Typography variant="bodySmall" fontWeight="bold" className="uppercase">
                  STATUS
                </Typography>
              </div>

              {/* Table Rows */}
              {filteredAmbitions.map((ambition, index) => (
                <Link
                  key={ambition.id}
                  href={ROUTES.GAME_CHANGERS_AMBITIONS_DETAIL(ambition.id)}
                  className="block"
                >
                  <m.div
                    variants={cardVariants}
                    className={cn(
                      'grid grid-cols-[200px_1fr_140px] gap-1.5 px-1.5 py-1 items-center cursor-pointer hover:bg-neutral-100 transition-colors',
                      index !== filteredAmbitions.length - 1 && 'border-b border-neutral-300',
                    )}
                  >
                    {/* Name column with avatar */}
                    <div className="flex gap-1 items-center">
                      <div className="relative size-3 rounded-full shrink-0 overflow-hidden">
                        <Image
                          src={ambition.avatarUrl || '/profile-img/default.png'}
                          alt={ambition.userName}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <Typography variant="body" fontWeight="bold" className="truncate">
                        {ambition.userName}
                      </Typography>
                    </div>

                    {/* Ambition column */}
                    <Typography variant="body" className="line-clamp-2">
                      {ambition.title}
                    </Typography>

                    {/* Status column */}
                    <div className="flex justify-start">
                      <AmbitionStatus variant={getStatusVariant(ambition.status)} size="sm">
                        {getStatusLabel(ambition.status)}
                      </AmbitionStatus>
                    </div>
                  </m.div>
                </Link>
              ))}
            </m.div>
          )}
        </AnimatePresence>
      )}

      {/* Actions Row */}
      <div className={cn('flex items-center justify-between w-full')}>
        {/* Add Button */}
        <Button
          variant="link"
          size="small"
          onClick={onAddAmbition}
          leftIcon={<Plus className="size-1.5" />}
          className={cn(isMobile && 'w-full')}
        >
          {t('addButton')}
        </Button>

        {/* Total Count */}
        <Typography variant="body" className={isMobile ? 'text-sm' : ''}>
          {t('totalAmbitions', { count: filteredAmbitions.length })}
        </Typography>
      </div>
    </div>
  )
}
