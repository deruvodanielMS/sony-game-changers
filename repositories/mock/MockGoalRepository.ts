import { Ambition, AmbitionUI, AMBITION_STATUSES, AMBITION_TYPES } from '@/domain/ambition'
import { GoalRepository } from '../GoalRepository'

export class MockGoalRepository implements GoalRepository {
  private mockData: AmbitionUI[] = [
    {
      id: '1',
      title: 'Improve customer satisfaction scores',
      status: AMBITION_STATUSES.DRAFT,
      userName: 'Sarah Miller',
      ambitionType: AMBITION_TYPES.BUSINESS,
      description: 'Increase customer satisfaction scores by 15% through improved service quality',
      avatarUrl: 'sarah-miller.png',
      ladderedGoals: [],
    },
    {
      id: '2',
      title: 'Launch new product feature',
      status: AMBITION_STATUSES.AWAITING_APPROVAL,
      userName: 'Lars Van Der Zee',
      ambitionType: AMBITION_TYPES.BUSINESS,
      description: 'Successfully launch the new analytics dashboard by Q2',
      avatarUrl: 'lars-van-der-zee.png',
      ladderedGoals: [],
    },
    {
      id: '3',
      title: 'Reduce technical debt',
      status: AMBITION_STATUSES.DRAFT,
      userName: 'Kylie Davies',
      ambitionType: AMBITION_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT,
      description: 'Refactor legacy code and improve test coverage to 80%',
      avatarUrl: 'kylie-davies.png',
      ladderedGoals: [],
    },
    {
      id: '4',
      title: 'Expand market presence',
      status: AMBITION_STATUSES.COMPLETED,
      userName: 'Nia Washington',
      ambitionType: AMBITION_TYPES.BUSINESS,
      description: 'Enter three new regional markets and establish partnerships',
      avatarUrl: 'nia-washington.png',
      ladderedGoals: [],
    },
    {
      id: '5',
      title: 'Improve team productivity',
      status: AMBITION_STATUSES.DRAFT,
      userName: 'Lisa Anderson',
      ambitionType: AMBITION_TYPES.MANAGER_EFFECTIVENESS,
      description: 'Implement new workflows and tools to increase team efficiency by 20%',
      avatarUrl: null,
      ladderedGoals: [],
    },
    {
      id: '6',
      title: 'Enhance security protocols',
      status: AMBITION_STATUSES.AWAITING_APPROVAL,
      userName: 'David Brown',
      ambitionType: AMBITION_TYPES.BUSINESS,
      description: 'Implement comprehensive security audit and upgrade infrastructure',
      avatarUrl: null,
      ladderedGoals: [],
    },
  ]

  async findMany(): Promise<AmbitionUI[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100))
    return this.mockData
  }

  async findById(id: string): Promise<AmbitionUI | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 50))
    return this.mockData.find((ambition) => ambition.id === id) || null
  }
}
