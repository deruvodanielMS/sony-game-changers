'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { m, AnimatePresence } from 'framer-motion'
import { Plus, Grid2x2, List } from 'lucide-react'
import { SearchField } from '@/components/ui/molecules/SearchField'
import { AvatarSelect } from '@/components/ui/molecules/AvatarSelect'
import { Typography } from '@/components/ui/foundations/Typography'
import { Button } from '@/components/ui/atoms/Button'
import { cn } from '@/utils/cn'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import type { AmbitionLadderingProps, ViewMode } from './AmbitionLaddering.types'

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
  ambitions,
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
  const filteredAmbitions = ambitions.filter((ambition) => {
    const matchesSearch =
      searchQuery === '' ||
      ambition.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ambition.assignee.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesAvatar =
      selectedAvatars.length === 0 || selectedAvatars.includes(ambition.assignee.uid || '')

    return matchesSearch && matchesAvatar
  })

  return (
    <div className={cn('flex flex-col gap-1 w-full', className)}>
      {/* Title + Filters */}
      <div
        className={cn(
          'flex items-end justify-end w-full',
          isMobile ? 'flex-col gap-1 items-stretch' : 'gap-1.5 h-3',
        )}
      >
        <Typography
          variant="h6"
          fontWeight="semibold"
          className={cn(isMobile ? 'mb-0.5' : 'flex-1')}
        >
          {t('title')}
        </Typography>

        <div
          className={cn(
            'flex items-center',
            isMobile ? 'flex-col gap-1 w-full' : 'gap-1.5',
            isTablet && 'flex-wrap',
          )}
        >
          {/* Search Field */}
          <SearchField
            className={isMobile ? 'w-full' : 'w-70'}
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={setSearchQuery}
          />

          {/* Avatar Filter */}
          {avatarOptions?.length > 0 && (
            <AvatarSelect
              options={avatarOptions}
              selected={selectedAvatars}
              onAvatarSelect={setSelectedAvatars}
              showItems={isMobile ? 3 : 5}
            />
          )}

          {/* View Toggle Icons */}
          {!isMobile && (
            <div className="flex gap-0.5">
              <button
                aria-label="Grid view"
                onClick={() => setViewMode('grid')}
                className={cn(
                  'flex items-center justify-center p-0.25 rounded-full transition-colors',
                  viewMode === 'grid' ? 'bg-neutral-200' : 'hover:bg-neutral-100',
                )}
              >
                <Grid2x2 className="size-1.5 text-neutral-1000" />
              </button>
              <button
                aria-label="List view"
                onClick={() => setViewMode('list')}
                className={cn(
                  'flex items-center justify-center p-0.25 rounded-full transition-colors',
                  viewMode === 'list' ? 'bg-neutral-200' : 'hover:bg-neutral-100',
                )}
              >
                <List className="size-1.5 text-neutral-1000" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Laddered Ambitions - Grid or List View */}
      <AnimatePresence mode="wait">
        {(viewMode === 'grid' || isMobile) && (
          <m.div
            key="grid-view"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={listVariants}
            className={cn(
              'flex w-full',
              isMobile ? 'flex-col gap-1' : 'gap-1',
              isTablet && 'flex-wrap',
            )}
          >
            {filteredAmbitions.map((ambition) => (
              <m.div
                key={ambition.id}
                variants={cardVariants}
                transition={{ duration: 0.3 }}
                className={cn(
                  'flex flex-col gap-1 bg-neutral-0 border border-neutral-300 rounded-1.5 p-1.5',
                  !isMobile && !isTablet && 'flex-1',
                  isTablet && 'flex-[0_0_calc(50%-0.5rem)]',
                )}
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
                    <div className="relative size-2.5 rounded-full shrink-0 overflow-hidden">
                      <Image
                        src={ambition.assignee.avatar}
                        alt={ambition.assignee.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <Typography
                      variant="body"
                      fontWeight="bold"
                      className="overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                      {ambition.assignee.name}
                    </Typography>
                  </div>

                  {/* Progress Bar */}
                  <div className="flex flex-col gap-0.125 items-start justify-center shrink-0">
                    <Typography variant="bodySmall" fontWeight="bold" className="text-right w-25">
                      {ambition.progress}%
                    </Typography>
                    <div className="relative w-25 h-0.5 rounded-full bg-neutral-200 overflow-hidden">
                      <m.div
                        initial={{ width: 0 }}
                        animate={{ width: `${ambition.progress}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="absolute top-0 left-0 h-full rounded-full bg-[#01a79a]"
                      />
                    </div>
                  </div>
                </div>
              </m.div>
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
            className="flex flex-col w-full bg-neutral-0 border border-neutral-300 rounded-1.5 overflow-hidden"
          >
            {/* Table Header */}
            <div className="grid grid-cols-[auto_1fr_auto] gap-1.5 px-1.5 py-1 bg-neutral-100 border-b border-neutral-300">
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
              <m.div
                key={ambition.id}
                variants={cardVariants}
                className={cn(
                  'grid grid-cols-[auto_1fr_auto] gap-1.5 px-1.5 py-1 items-center',
                  index !== filteredAmbitions.length - 1 && 'border-b border-neutral-300',
                )}
              >
                {/* Name column with avatar */}
                <div className="flex gap-1 items-center">
                  <div className="relative size-2.5 rounded-full shrink-0 overflow-hidden">
                    <Image
                      src={ambition.assignee.avatar}
                      alt={ambition.assignee.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <Typography variant="body" fontWeight="bold">
                    {ambition.assignee.name}
                  </Typography>
                </div>

                {/* Ambition column */}
                <Typography variant="body" className="line-clamp-2">
                  {ambition.title}
                </Typography>

                {/* Status column */}
                <Typography variant="body" className="text-extra-blue-600">
                  {ambition.status || 'Draft'}
                </Typography>
              </m.div>
            ))}
          </m.div>
        )}
      </AnimatePresence>

      {/* Actions Row */}
      <div
        className={cn(
          'flex items-center justify-between w-full',
          isMobile ? 'flex-col gap-1 h-auto' : 'h-2.5',
        )}
      >
        {/* Add Button */}
        <Button
          variant="plain"
          onClick={onAddAmbition}
          className={cn(
            'flex gap-0.5 items-center justify-center px-0.75 py-0.25 rounded-xlarge',
            isMobile && 'w-full h-2.5',
          )}
        >
          <Plus className="size-1.5" />
          <Typography variant="bodySmall" fontWeight="semibold">
            {t('addButton')}
          </Typography>
        </Button>

        {/* Total Count */}
        <Typography variant="body" className={isMobile ? 'text-sm' : ''}>
          {t('totalAmbitions', { count: filteredAmbitions.length })}
        </Typography>
      </div>
    </div>
  )
}
