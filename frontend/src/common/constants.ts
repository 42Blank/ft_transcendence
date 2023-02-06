export const ROUTE = {
  ROOT: '/',
  CHAT: '/chat',
  GAME: '/game',
  PROFILE: '/profile',
  LOGIN: '/login',
  LOGIN_CHECK: '/login/callback',
  REGISTER: '/login/new',
} as const;

export const API = {
  // Login
  FT_AUTH: '/auth/ft',
  FT_AUTH_CALLBACK: '/auth/ft/callback',
  SIGN_OUT: '/auth/signout',

  // User
  USER: '/users',
  USER_ME: '/users/me',
} as const;
