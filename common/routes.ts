export const BASE_ROUTES = {
  ROOT: '/',
  TEAM: '/team',
  NOTIFICATIONS: '/notifications',
  PROFILE: '/profile',
  GAME_CHANGERS: '/game-changers',
} as const

export const ROUTES = {
  ...BASE_ROUTES,
  GAME_CHANGERS_AMBITIONS: `${BASE_ROUTES.GAME_CHANGERS}/ambitions`,
  GAME_CHANGERS_AMBITIONS_NEW: `${BASE_ROUTES.GAME_CHANGERS}/ambitions/new`,
  GAME_CHANGERS_CHECK_INS: `${BASE_ROUTES.GAME_CHANGERS}/check-ins`,
  GAME_CHANGERS_FEEDBACK: `${BASE_ROUTES.GAME_CHANGERS}/feedback`,
  GAME_CHANGERS_PERFORMANCE_REVIEW: `${BASE_ROUTES.GAME_CHANGERS}/performance-reviews`,
  GAME_CHANGERS_TALENT_PLANNING: `${BASE_ROUTES.GAME_CHANGERS}/talent-planning`,
} as const

export type Routes = typeof ROUTES
export type RouteValues = Routes[keyof Routes]

const BASE_API = '/api'

export const API_ROUTES = {
  AMBITIONS: `${BASE_API}/ambitions`,
  USER: `${BASE_API}/user`,
} as const

export type ApiRoutes = typeof API_ROUTES
export type ApiRouteValues = ApiRoutes[keyof ApiRoutes]
