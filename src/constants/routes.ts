export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  COMPANIES: '/companies',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  
  // Dashboard sub-routes
  AGENTS: '/dashboard/agents',
  ANALYTICS: '/dashboard/analytics',
  INTEGRATIONS: '/dashboard/integrations',
  USERS: '/dashboard/users',
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
] as const;

export const PROTECTED_ROUTES = [
  ROUTES.COMPANIES,
  ROUTES.DASHBOARD,
  ROUTES.PROFILE,
  ROUTES.SETTINGS,
  ROUTES.AGENTS,
  ROUTES.ANALYTICS,
  ROUTES.INTEGRATIONS,
  ROUTES.USERS,
] as const;