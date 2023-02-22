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
  FT_AUTH_RANDOM: '/auth/ft/random',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  SIGN_OUT: '/auth/signout',

  // User
  USER: '/users',
  USER_ME: '/users/me',

  // Friend/Block
  FRIEND: '/friend',
  BLOCK: '/friend/block',
} as const;
