'use client'

import { useEffect } from 'react'
import { AnimatedSection } from '@/components/ui/foundations/AnimatedSection'
import { TeamView } from '@/components/team/TeamView'
import { useGoalsStore } from '@/stores/goals.store'
import type { TeamMember } from '@/components/team/TeamMemberCard'

export default function MyTeamPage() {
  const { goalFilters, fetchGoalFilters } = useGoalsStore()

  // Fetch filters on mount to get team members data
  useEffect(() => {
    fetchGoalFilters()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Transform avatar options to team members format
  const members: TeamMember[] =
    goalFilters?.avatarSelector?.options.map((option) => ({
      uid: option.uid,
      name: option.name,
      url: option.url,
      role: option.role,
    })) ?? []

  return (
    <div className="p-1 md:pt-1_5 md:px-3 md:pb-3 mt-4_5 md:mt-0">
      <AnimatedSection delay={0}>
        <TeamView members={members} />
      </AnimatedSection>
    </div>
  )
}
