'use client'

import { use, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import {
  MoreHorizontal,
  CornerDownRight,
  Target,
  Info,
  Check,
  Plus,
  Grid2x2,
  List,
  ArrowRight,
} from 'lucide-react'
import { Breadcrumb } from '@/components/ui/molecules/Breadcrumb'
import { CollapsibleSection } from '@/components/ui/molecules/CollapsibleSection'
import { AvatarSelect } from '@/components/ui/molecules/AvatarSelect'
import { AnimatedSection } from '@/components/ui/foundations/AnimatedSection'
import { Typography } from '@/components/ui/foundations/Typography'
import { Button } from '@/components/ui/atoms/Button'
import { ProgressRing } from '@/components/ui/atoms/ProgressRing'
import { SearchField } from '@/components/ui/molecules/SearchField'
import { generateInitialsAvatarSrc } from '@/utils/generateInitialsAvatar'
import { useAmbitionsStore } from '@/stores/ambitions.store'
import { ROUTES } from '@/common/routes'
import { AMBITION_TYPES } from '@/domain/ambition'
import { Shrub, BriefcaseBusiness, Sprout } from 'lucide-react'
import { cn } from '@/utils/cn'

const GoalTypeIcons = {
  [AMBITION_TYPES.BUSINESS]: <Sprout className="size-1_5 text-neutral-0" />,
  [AMBITION_TYPES.MANAGER_EFFECTIVENESS]: <BriefcaseBusiness className="size-1_5 text-neutral-0" />,
  [AMBITION_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT]: <Shrub className="size-1_5 text-neutral-0" />,
}

export default function AmbitionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const t = useTranslations('AmbitionDetail')
  const { id } = use(params)
  const { list, fetchList, selected, selectAmbition } = useAmbitionsStore()

  // State for collapsible sections - must be before early returns
  const [isActionsOpen, setIsActionsOpen] = useState(true)
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(true)

  // State for laddered ambitions search and view mode
  const [ladderedSearch, setLadderedSearch] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedAvatars, setSelectedAvatars] = useState<string[]>([])

  // Mock laddered ambitions data - TODO: Replace with real data from API
  const ladderedAmbitions = [
    {
      id: '1',
      title:
        'Optimize the cross-platform entitlement engine to ensure seamless delivery of digital service benefits to device owners.',
      assignee: {
        name: 'Lars van der Zee',
        avatar: '/profile-img/lars-van-der-zee.png',
      },
      progress: 33,
    },
    {
      id: '2',
      title:
        'Integrate all mandatory feedback from playtests into level design by the end of each sprint.',
      assignee: {
        name: 'Jürgen Schneider',
        avatar: '/profile-img/profile.png',
      },
      progress: 66,
    },
    {
      id: '3',
      title:
        'Scale the cross-platform entitlement engine to facilitate frictionless monetization and the automated provisioning of premium service tiers across the global device footprint.',
      assignee: {
        name: 'Amélie Martin',
        avatar: '/profile-img/sarah-miller.png',
      },
      progress: 33,
    },
  ]

  // Mock avatar options for face pile
  const avatarOptions = [
    { uid: '1', name: 'Nia Washington', url: '/profile-img/nia-washington.png' },
    { uid: '2', name: 'Lars van der Zee', url: '/profile-img/lars-van-der-zee.png' },
    { uid: '3', name: 'Kylie Davies', url: '/profile-img/kylie-davies.png' },
    { uid: '4', name: 'Sarah Miller', url: '/profile-img/sarah-miller.png' },
    { uid: '5', name: 'Profile', url: '/profile-img/profile.png' },
  ]

  // Mock activity feed data - TODO: Replace with real data from API
  const activityFeed = [
    {
      id: '1',
      user: { name: 'James Miller', avatar: '/profile-img/profile.png' },
      action: 'completed',
      target: 'the Ambition',
      date: 'Dec 15, 2025',
    },
    {
      id: '2',
      user: { name: 'Rupert Sterling', avatar: '/profile-img/lars-van-der-zee.png' },
      action: 'approved',
      date: 'Dec 14, 2025',
    },
    {
      id: '3',
      user: { name: 'James Miller', avatar: '/profile-img/profile.png' },
      action: 'statusChange',
      from: 'Draft',
      to: 'Awaiting Approval',
      date: 'Dec 13, 2025',
    },
    {
      id: '4',
      user: { name: 'James Miller', avatar: '/profile-img/profile.png' },
      action: 'created',
      status: 'Draft',
      date: 'Dec 10, 2025',
    },
  ]

  // Mock achievements data - TODO: Replace with real data from API
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      text: 'Lead a cross-functional project',
      completed: true,
      progress: null as 'not-started' | 'on-track' | 'off-track' | null,
    },
    {
      id: 2,
      text: 'Mentor a junior team member',
      completed: false,
      progress: null as 'not-started' | 'on-track' | 'off-track' | null,
    },
    {
      id: 3,
      text: 'Complete advanced leadership training',
      completed: false,
      progress: null as 'not-started' | 'on-track' | 'off-track' | null,
    },
  ])

  const handleAchievementToggle = (id: number) => {
    setAchievements((prev) =>
      prev.map((achievement) =>
        achievement.id === id
          ? { ...achievement, completed: !achievement.completed, progress: null }
          : achievement,
      ),
    )
  }

  const handleProgressChange = (id: number, progress: 'not-started' | 'on-track' | 'off-track') => {
    setAchievements((prev) =>
      prev.map((achievement) =>
        achievement.id === id ? { ...achievement, progress } : achievement,
      ),
    )
  }

  useEffect(() => {
    if (!list) {
      fetchList()
    }
  }, [list, fetchList])

  useEffect(() => {
    if (list && id) {
      const ambition = list.find((a) => a.id === id)
      if (ambition) {
        selectAmbition(ambition)
      }
    }
  }, [list, id, selectAmbition])

  if (!selected) {
    return (
      <div className="flex flex-col gap-1_5 w-full">
        <AnimatedSection delay={0}>
          <Typography variant="body">Loading...</Typography>
        </AnimatedSection>
      </div>
    )
  }

  const { title, userName, avatarUrl, ambitionType, ladderedGoals, status } = selected
  const parentAmbition = ladderedGoals?.[0]

  // Calculate progress based on laddered goals completion
  const totalLadderedGoals = ladderedGoals?.length || 0
  const completedLadderedGoals = ladderedGoals?.filter((g) => g.status === 'completed').length || 0
  const progress =
    totalLadderedGoals > 0 ? Math.round((completedLadderedGoals / totalLadderedGoals) * 100) : 0

  // Determine which action buttons to show based on status
  const showApprovalActions = status === 'awaiting_approval'
  const showSendForApproval = status === 'draft'
  const showAnyActions = showApprovalActions || showSendForApproval

  // Mock actions data - TODO: replace with real data
  const actions = [
    'Launch exclusive cross-platform content bundles that leverage internal media production assets to drive deeper user engagement within the ecosystem.',
    'Deploy unified loyalty programs that reward users for engagement across both physical and digital products while ensuring scalable backend integration.',
    'Enhance the global distribution infrastructure to ensure low-latency delivery of high-fidelity digital media across all regional server nodes efficiently.',
  ]

  const breadcrumbItems = [
    { label: t('breadcrumb.ambitions'), href: ROUTES.GAME_CHANGERS_AMBITIONS },
    { label: t('breadcrumb.detail') },
  ]

  return (
    <div className="flex flex-col gap-1_5 w-full">
      <AnimatedSection delay={0}>
        {/* Breadcrumb and Main Actions */}
        <div className="flex items-center justify-between w-full">
          <Breadcrumb items={breadcrumbItems} />

          {/* Main Actions */}
          {showAnyActions && (
            <div className="flex gap-1 h-2_5 items-center">
              {/* Awaiting Approval: Send Back + Approve buttons */}
              {showApprovalActions && (
                <>
                  <Button variant="secondary">{t('actions.sendBack')}</Button>
                  <Button variant="primary">{t('actions.approve')}</Button>
                </>
              )}

              {/* Draft: Send for Approval button */}
              {showSendForApproval && (
                <Button variant="primary">{t('actions.sendForApproval')}</Button>
              )}

              {/* More Options Icon Button */}
              <button
                className="flex items-center justify-center p-0_25 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label={t('actions.moreOptions')}
              >
                <MoreHorizontal className="size-1_5 text-neutral-1000" />
              </button>
            </div>
          )}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        {/* Laddered Goal section */}
        {parentAmbition && (
          <div className="flex h-2 items-center w-full">
            <div className="flex flex-1 gap-0_5 h-2 items-center min-h-px min-w-px">
              {/* Icon Button - rotated and flipped */}
              <div className="flex items-center justify-center size-2">
                <div className="rotate-90 scale-y-[-100%]">
                  <button className="flex items-center justify-center p-0_25 rounded-full hover:bg-neutral-100 transition-colors">
                    <CornerDownRight className="size-1_5 text-neutral-1000" />
                  </button>
                </div>
              </div>

              {/* Laddered goal description */}
              <Typography
                variant="body"
                className="flex-1 min-h-px min-w-px overflow-hidden text-ellipsis text-neutral-600"
              >
                {parentAmbition.title}
              </Typography>
            </div>
          </div>
        )}
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        {/* Goal Header section */}
        <div className="bg-neutral-100 flex gap-3 items-center p-2 rounded-1_5 w-full">
          {/* Left section - Title and metadata */}
          <div className="flex flex-1 flex-col gap-2 items-start min-h-px min-w-px">
            {/* Title and Icon */}
            <div className="flex gap-1 h-4 items-center w-full">
              {/* Goal Type Icon with gradient background */}
              {ambitionType && (
                <div className="bg-gradient-to-l from-[#5577f4] to-[#d061ff] flex items-center justify-center p-0_625 rounded-full shrink-0 size-3">
                  {GoalTypeIcons[ambitionType as keyof typeof GoalTypeIcons] || (
                    <Target className="size-1_5 text-neutral-0" />
                  )}
                </div>
              )}

              {/* Goal Title */}
              <Typography variant="h5" className="overflow-hidden text-ellipsis shrink-0">
                {title}
              </Typography>
            </div>

            {/* Metadata row */}
            <div className="flex gap-1 h-1_5 items-center pl-4 w-full">
              {/* Created by */}
              <div className="flex gap-0_5 items-center justify-end shrink-0">
                <Image
                  src={avatarUrl || generateInitialsAvatarSrc(userName, { size: 24 })}
                  alt={userName}
                  width={24}
                  height={24}
                  className="size-1_5 rounded-full"
                />
                <Typography variant="bodySmall" className="text-neutral-600">
                  {t('metadata.createdBy')} <span className="font-bold">{userName}</span>{' '}
                  {t('metadata.on')} <span className="font-bold">10/08/2025</span>
                </Typography>
              </div>

              {/* Divider */}
              <div className="bg-neutral-300 h-1 w-px shrink-0" />

              {/* Assigned to */}
              <div className="flex gap-0_5 items-center justify-end shrink-0">
                <Image
                  src={avatarUrl || generateInitialsAvatarSrc(userName, { size: 24 })}
                  alt={userName}
                  width={24}
                  height={24}
                  className="size-1_5 rounded-full"
                />
                <Typography variant="bodySmall" className="text-neutral-600">
                  {t('metadata.assignedTo')} <span className="font-bold">{userName}</span>
                </Typography>
              </div>

              {/* Divider */}
              <div className="bg-neutral-300 h-1 w-px shrink-0" />

              {/* Last Update */}
              <Typography
                variant="bodySmall"
                className="text-neutral-600 overflow-hidden text-ellipsis shrink-0"
              >
                {t('metadata.lastUpdate')} <span className="font-bold">10/08/2025, 10:15 am</span>
              </Typography>
            </div>
          </div>

          {/* Right section - Progress metrics */}
          <div className="flex items-center justify-end shrink-0">
            <div className="bg-neutral-100 flex gap-1 h-4_5 items-center justify-end p-0_75 rounded-1 shrink-0">
              {/* Progress Ring */}
              <ProgressRing progress={progress} size={64} strokeWidth={6} />

              {/* Data */}
              <div className="flex flex-col gap-0_5 items-end justify-center shrink-0">
                <div className="flex gap-0_5 items-center">
                  <Typography variant="h5" className="text-neutral-1000">
                    {progress}%
                  </Typography>
                  {/* Tooltip button */}
                  <button className="relative group" aria-label={t('progress.fullLaddering')}>
                    <Info className="size-1 text-neutral-600 hover:text-neutral-1000 transition-colors" />
                    {/* Tooltip - shown on hover */}
                    <div className="absolute bottom-full right-0 mb-0_5 hidden group-hover:flex flex-col items-center pointer-events-none">
                      <div className="bg-neutral-1000 px-0_5 py-0_375 rounded-0_25 shadow-lg">
                        <Typography
                          variant="bodyTiny"
                          className="text-neutral-0 text-center whitespace-nowrap"
                        >
                          {t('progress.fullLaddering')}
                        </Typography>
                      </div>
                      <div
                        className="w-1 h-0_25 bg-neutral-1000"
                        style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}
                      />
                    </div>
                  </button>
                </div>
                <Typography variant="bodySmall" className="text-neutral-500">
                  {t('progress.completed')}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Actions Section */}
      <AnimatedSection delay={0.15}>
        <CollapsibleSection
          title={t('actions.title')}
          open={isActionsOpen}
          onToggle={setIsActionsOpen}
        >
          {actions.map((action, index) => (
            <div
              key={index}
              className="border-b border-solid border-neutral-200 flex gap-0.625 h-3.5 items-center px-1 py-0.5 w-full last:border-b-0"
            >
              {/* Bullet point */}
              <div className="size-0.375 rounded-full bg-neutral-1000 shrink-0" />

              {/* Action text */}
              <Typography variant="body" className="text-neutral-1000 shrink-0">
                {action}
              </Typography>
            </div>
          ))}
        </CollapsibleSection>
      </AnimatedSection>

      {/* Achievements Section */}
      <AnimatedSection delay={0.2}>
        <CollapsibleSection
          title={t('achievements.title')}
          open={isAchievementsOpen}
          onToggle={setIsAchievementsOpen}
        >
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={cn(
                'flex items-center p-1.5 rounded-1 border border-solid',
                achievement.completed
                  ? 'bg-extra-green-100 border-extra-green-200'
                  : 'bg-neutral-0 border-neutral-200',
              )}
            >
              {/* Content wrapper */}
              <div className="flex items-center gap-0.5 flex-1 min-w-0">
                {/* Checkbox */}
                <label className="flex items-center gap-0.5 cursor-pointer flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={achievement.completed}
                    onChange={() => handleAchievementToggle(achievement.id)}
                    className="sr-only"
                    aria-label={achievement.text}
                  />
                  <div
                    className={cn(
                      'shrink-0 size-1.5 rounded flex items-center justify-center transition-all',
                      achievement.completed
                        ? 'bg-extra-green-500'
                        : 'bg-transparent border-2 border-neutral-600',
                    )}
                  >
                    {achievement.completed && (
                      <Check className="size-3 text-neutral-0" strokeWidth={3} />
                    )}
                  </div>
                  <Typography variant="body" color="default" className="min-w-0">
                    {achievement.text}
                  </Typography>
                </label>
              </div>

              {/* Progress Selector - Only show for non-completed achievements */}
              {!achievement.completed && (
                <div className="flex gap-0.25 bg-neutral-100 p-0.25 rounded-full shrink-0 ml-1.5">
                  {(['not-started', 'on-track', 'off-track'] as const).map((progressOption) => {
                    const isSelected = achievement.progress === progressOption
                    const labels = {
                      'not-started': t('achievements.progress.notStarted'),
                      'on-track': t('achievements.progress.onTrack'),
                      'off-track': t('achievements.progress.offTrack'),
                    }
                    const colors = {
                      'not-started': {
                        bg: 'bg-neutral-200',
                        text: 'text-neutral-700',
                      },
                      'on-track': {
                        bg: 'bg-extra-blue-100',
                        text: 'text-extra-blue-600',
                      },
                      'off-track': {
                        bg: 'bg-feedback-danger-100',
                        text: 'text-feedback-danger-600',
                      },
                    }

                    return (
                      <button
                        key={progressOption}
                        onClick={() => handleProgressChange(achievement.id, progressOption)}
                        className={cn(
                          'px-1 py-0.5 rounded-full transition-all',
                          isSelected
                            ? cn(colors[progressOption].bg, colors[progressOption].text)
                            : 'text-neutral-600',
                        )}
                      >
                        <Typography
                          variant="bodySmall"
                          fontWeight="semibold"
                          className="whitespace-nowrap"
                        >
                          {labels[progressOption]}
                        </Typography>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </CollapsibleSection>
      </AnimatedSection>

      {/* Laddered Ambitions Section */}
      <AnimatedSection delay={0.2}>
        <div className="flex flex-col gap-1 w-full">
          {/* Title + Filters */}
          <div className="flex gap-1_5 h-3 items-end justify-end w-full">
            <Typography variant="h6" fontWeight="semibold" className="flex-1">
              {t('ladderedAmbitions.title')}
            </Typography>
            <div className="flex gap-1_5 items-center">
              {/* Search Field */}
              <SearchField
                className="w-[280px]"
                placeholder={t('ladderedAmbitions.searchPlaceholder')}
                value={ladderedSearch}
                onChange={setLadderedSearch}
              />

              {/* Avatar Filter */}
              <AvatarSelect
                options={avatarOptions}
                selected={selectedAvatars}
                onAvatarSelect={setSelectedAvatars}
                showItems={5}
              />

              {/* View Toggle Icons */}
              <button
                aria-label="Grid view"
                onClick={() => setViewMode('grid')}
                className={cn(
                  'flex items-center justify-center p-0_25 rounded-full transition-colors',
                  viewMode === 'grid' ? 'bg-neutral-200' : 'hover:bg-neutral-100',
                )}
              >
                <Grid2x2 className="size-1_5 text-neutral-1000" />
              </button>
              <button
                aria-label="List view"
                onClick={() => setViewMode('list')}
                className={cn(
                  'flex items-center justify-center p-0_25 rounded-full transition-colors',
                  viewMode === 'list' ? 'bg-neutral-200' : 'hover:bg-neutral-100',
                )}
              >
                <List className="size-1_5 text-neutral-1000" />
              </button>
            </div>
          </div>

          {/* Laddered Ambitions - Grid or List View */}
          {viewMode === 'grid' ? (
            <div className="flex gap-1 w-full">
              {ladderedAmbitions.map((ambition) => (
                <div
                  key={ambition.id}
                  className="flex-1 flex flex-col gap-1 bg-neutral-0 border border-neutral-300 rounded-1_5 p-1_5"
                >
                  {/* Title */}
                  <Typography
                    variant="body"
                    className="h-3 overflow-hidden text-ellipsis line-clamp-2"
                  >
                    {ambition.title}
                  </Typography>

                  {/* Employee + Progress */}
                  <div className="flex gap-1 h-[42px] items-center w-full">
                    {/* Employee Info */}
                    <div className="flex-1 flex gap-1 h-2_5 items-center min-w-0">
                      <div className="relative size-2_5 rounded-full shrink-0 overflow-hidden">
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
                    <div className="flex flex-col gap-0_125 items-start justify-center shrink-0">
                      <Typography
                        variant="bodySmall"
                        fontWeight="bold"
                        className="text-right w-[100px]"
                      >
                        {ambition.progress}%
                      </Typography>
                      <div className="relative w-[100px] h-0_5 rounded-full bg-neutral-200 overflow-hidden">
                        <div
                          className="absolute top-0 left-0 h-full rounded-full bg-[#01a79a]"
                          style={{ width: `${ambition.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col w-full bg-neutral-0 border border-neutral-300 rounded-1_5 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-[auto_1fr_auto] gap-1_5 px-1_5 py-1 bg-neutral-100 border-b border-neutral-300">
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
              {ladderedAmbitions.map((ambition, index) => (
                <div
                  key={ambition.id}
                  className={cn(
                    'grid grid-cols-[auto_1fr_auto] gap-1_5 px-1_5 py-1 items-center',
                    index !== ladderedAmbitions.length - 1 && 'border-b border-neutral-300',
                  )}
                >
                  {/* Name column with avatar */}
                  <div className="flex gap-1 items-center">
                    <div className="relative size-2_5 rounded-full shrink-0 overflow-hidden">
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
                  <Typography variant="body">{ambition.title}</Typography>

                  {/* Status column */}
                  <Typography variant="body" className="text-extra-blue-600">
                    Draft
                  </Typography>
                </div>
              ))}
            </div>
          )}

          {/* Actions Row */}
          <div className="flex h-2_5 items-center justify-between w-full">
            {/* Add Button */}
            <Button
              variant="plain"
              className="flex gap-0_5 h-full items-center justify-center px-0_75 py-0_25 rounded-xlarge"
            >
              <Plus className="size-1_5" />
              <Typography variant="bodySmall" fontWeight="semibold">
                {t('ladderedAmbitions.addButton')}
              </Typography>
            </Button>

            {/* Total Count */}
            <Typography variant="body">
              {t('ladderedAmbitions.totalAmbitions', { count: ladderedAmbitions.length })}
            </Typography>
          </div>
        </div>
      </AnimatedSection>

      {/* Activity Feed Section */}
      <AnimatedSection delay={0.25}>
        <div className="flex flex-col gap-2_5 w-full">
          {/* Add Comment */}
          <div className="flex gap-1 items-start w-full">
            <div className="relative size-2 rounded-full shrink-0 overflow-hidden">
              <Image
                src="/profile-img/profile.png"
                alt="Current user"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <textarea
                placeholder={t('activity.addCommentPlaceholder')}
                className="w-full h-[92px] px-1 py-0_75 border border-neutral-300 rounded-small bg-neutral-0 text-neutral-600 placeholder:text-neutral-600 resize-none focus:outline-none focus:ring-2 focus:ring-accent-primary"
              />
            </div>
          </div>

          {/* Activity History */}
          <div className="flex flex-col gap-2 w-full">
            {activityFeed.map((activity) => (
              <div key={activity.id} className="flex gap-1 items-start w-full">
                <div className="relative size-2 rounded-full shrink-0 overflow-hidden">
                  <Image
                    src={activity.user.avatar}
                    alt={activity.user.name}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-0_25 flex-1">
                  <div className="flex gap-0_5 h-2 items-center">
                    <Typography variant="body" fontWeight="bold">
                      {activity.user.name}
                    </Typography>
                    {activity.action === 'completed' && (
                      <Typography variant="body">
                        <span className="font-bold text-feedback-success-600">
                          {t('activity.completed')}
                        </span>{' '}
                        {t('activity.theAmbition')}
                      </Typography>
                    )}
                    {activity.action === 'approved' && (
                      <Typography variant="body">{t('activity.approved')}</Typography>
                    )}
                    {activity.action === 'statusChange' && (
                      <>
                        <Typography variant="body">{t('activity.changedStatus')}</Typography>
                        <div className="flex gap-0_5 items-center">
                          <div className="px-0_5 py-0_125 bg-extra-blue-100 rounded-default">
                            <Typography
                              variant="body"
                              fontWeight="bold"
                              className="text-extra-blue-600"
                            >
                              {activity.from}
                            </Typography>
                          </div>
                          <ArrowRight className="size-1 text-neutral-1000" />
                          <div className="px-0_5 py-0_125 bg-extra-pink-100 rounded-default">
                            <Typography
                              variant="body"
                              fontWeight="bold"
                              className="text-extra-pink-600"
                            >
                              {activity.to}
                            </Typography>
                          </div>
                        </div>
                      </>
                    )}
                    {activity.action === 'created' && (
                      <>
                        <Typography variant="body">{t('activity.created')}</Typography>
                        <div className="px-0_5 py-0_125 bg-extra-blue-100 rounded-default">
                          <Typography
                            variant="body"
                            fontWeight="bold"
                            className="text-extra-blue-600"
                          >
                            {activity.status}
                          </Typography>
                        </div>
                      </>
                    )}
                  </div>
                  <Typography variant="bodySmall" className="text-neutral-500">
                    {activity.date}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
