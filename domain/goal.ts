export type Goal = {
  id: number
  title: string
  body: string
  type: string
  status: string

  parentId?: number | null
  path?: string | null

  assignedTo: number
  createdBy: number
  periodId: number

  createdAt: Date
}
