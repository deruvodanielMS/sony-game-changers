export type Goal = {
  id: string
  title: string
  body: string
  type: string
  status: string

  parentId?: string | null
  path?: string | null

  assignedTo?: string
  createdBy?: string
  periodId?: string
}

export type GoalDraft = Pick<Goal, 'title' | 'body' | 'type' | 'status'>
