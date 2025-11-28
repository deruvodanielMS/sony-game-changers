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
} as const

export type Routes = typeof ROUTES
export type RouteValues = Routes[keyof Routes]
