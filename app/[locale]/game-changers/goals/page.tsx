import { GoalsHeader } from '@/components/game-changers/goals/GoalsHeader'
import { GoalCard } from '@/components/ui/organisms/GoalCard'
import { GOAL_STATUSES, GOAL_TYPES } from '@/types/goals'

const goalTeamMock = {
  goal: {
    id: 'goal-1',
    userName: 'Alice Williams',
    title:
      'Ensure core title features meet established quality bars to achieve a strong critical reception score and boost future sales.',
    status: GOAL_STATUSES.AWAITING_APPROVAL,
    goalType: GOAL_TYPES.TEAM,
    description:
      'Deliver a truly compelling, next-generation, immersive gaming experience immersive gaming experience that secures leading industry recognition and high player satisfaction.',
    avatarUrl: 'https://i.pravatar.cc/40?img=12',
  },
  ladderGoals: [
    {
      id: 'goal-2',
      userName: 'Bob Smith',
      title:
        'Verify the successful operation of all major systems and complete 100% of test cases before Alpha.',
      status: GOAL_STATUSES.DRAFT,
      goalType: GOAL_TYPES.TEAM,
      description: 'Increase conversion from 10% to 15%',
    },
    {
      id: 'goal-3',
      userName: 'Charlie Johnson',
      title:
        'Integrate all mandatory feedback from playtests into level design by the end of each sprint.',
      status: GOAL_STATUSES.COMPLETED,
      goalType: GOAL_TYPES.PERSONAL,
      avatarUrl: 'https://i.pravatar.cc/40?img=12',
    },
  ],
  'data-test-id': 'goal-team-mock',
  allowAddChildrenGoals: true,
}

const goalPersonalMock = {
  goal: {
    id: 'goal-4',
    userName: 'David Brown',
    title:
      "Strategically increase The Team's technical expertise by implementing targeted upskilling initiatives in critical architectural domains (e.g., CI/CD).",
    status: GOAL_STATUSES.COMPLETED,
    goalType: GOAL_TYPES.PERSONAL,
    avatarUrl: 'https://i.pravatar.cc/40?img=12',
  },
  ladderGoals: [],
  'data-test-id': 'goal-personal-mock',
  allowAddChildrenGoals: false,
}

export default function GameChangersGoalsPage() {
  return (
    <div className="flex flex-col gap-3">
      <GoalsHeader />
      <GoalCard {...goalTeamMock} />
      <GoalCard {...goalPersonalMock} />
    </div>
  )
}
