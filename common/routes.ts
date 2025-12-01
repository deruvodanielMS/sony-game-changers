export const BASE_ROUTES = {
  ROOT: '/',
  TEAM: '/team',
  NOTIFICATIONS: '/notifications',
  PROFILE: '/profile',
  GAME_CHANGERS: '/game-changers',
} as const

export const ROUTES = {
  ...BASE_ROUTES,
  GAME_CHANGERS_GOALS: `${BASE_ROUTES.GAME_CHANGERS}/goals`,
  GAME_CHANGERS_CHECK_INS: `${BASE_ROUTES.GAME_CHANGERS}/check-ins`,
  GAME_CHANGERS_FEEDBACK: `${BASE_ROUTES.GAME_CHANGERS}/feedback`,
  GAME_CHANGERS_PERFORMANCE_REVIEW: `${BASE_ROUTES.GAME_CHANGERS}/performance-reviews`,
  GAME_CHANGERS_TALENT_PLANNING: `${BASE_ROUTES.GAME_CHANGERS}/talent-planning`,
} as const

export type Routes = typeof ROUTES
export type RouteValues = Routes[keyof Routes]
