export interface ActivityItem {
  id: string
  user: {
    name: string
    avatar: string
  }
  action: 'completed' | 'approved' | 'statusChange' | 'created'
  target?: string
  from?: string
  to?: string
  status?: string
  date: string
}

export interface AmbitionActivityFeedProps {
  activities: ActivityItem[]
  currentUserAvatar?: string
  onCommentSubmit?: (comment: string) => void
  className?: string
}
