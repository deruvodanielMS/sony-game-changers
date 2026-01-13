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
      avatarUrl: '/profile-img/avatar1.png',
      ladderedGoals: [],
    },
    {
      id: '2',
      title: 'Launch new product feature',
      status: AMBITION_STATUSES.AWAITING_APPROVAL,
      userName: 'John Smith',
      ambitionType: AMBITION_TYPES.BUSINESS,
      description: 'Successfully launch the new analytics dashboard by Q2',
      avatarUrl: '/profile-img/avatar2.png',
      ladderedGoals: [],
    },
    {
      id: '3',
      title: 'Reduce technical debt',
      status: AMBITION_STATUSES.DRAFT,
      userName: 'Emma Davis',
      ambitionType: AMBITION_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT,
      description: 'Refactor legacy code and improve test coverage to 80%',
      avatarUrl: '/profile-img/avatar3.png',
      ladderedGoals: [],
    },
    {
      id: '4',
      title: 'Expand market presence',
      status: AMBITION_STATUSES.COMPLETED,
      userName: 'Michael Chen',
      ambitionType: AMBITION_TYPES.BUSINESS,
      description: 'Enter three new regional markets and establish partnerships',
      avatarUrl: '/profile-img/avatar4.png',
      ladderedGoals: [],
    },
    {
      id: '5',
      title: 'Improve team productivity',
      status: AMBITION_STATUSES.DRAFT,
      userName: 'Lisa Anderson',
      ambitionType: AMBITION_TYPES.MANAGER_EFFECTIVENESS,
      description: 'Implement new workflows and tools to increase team efficiency by 20%',
      avatarUrl: '/profile-img/avatar5.png',
      ladderedGoals: [],
    },
    {
      id: '6',
      title: 'Enhance security protocols',
      status: AMBITION_STATUSES.AWAITING_APPROVAL,
      userName: 'David Brown',
      ambitionType: AMBITION_TYPES.BUSINESS,
      description: 'Implement comprehensive security audit and upgrade infrastructure',
      avatarUrl: '/profile-img/avatar6.png',
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
