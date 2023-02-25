export const ROUTE = {
  ROOT: '/',
  CHAT: '/chat',
  GAME: '/game',
  RESULT: '/game/result',
  PROFILE: '/profile',
  LOGIN: '/login',
  LOGIN_CHECK: '/login/callback',
  LOGIN_RANDOM: '/login/random',
  REGISTER: '/login/new',
  GITHUB_CHECK: '/github/callback',
} as const;

export const API = {
  // Login
  FT_AUTH: '/auth/ft',
  FT_AUTH_CALLBACK: '/auth/ft/callback',
  FT_AUTH_RANDOM: '/auth/ft/random',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  SIGN_OUT: '/auth/signout',
  GITHUB_AUTH: '/auth/github',
  GITHUB_AUTH_CALLBACK: '/auth/github/callback',
  GITHUB_SIGN_OUT: '/users/two-factor-auth',

  // User
  USER: '/users',
  USER_ME: '/users/me',
  USER_CHECK_DUPLICATE_NICKNAME: '/users/check-duplicate-nickname',

  // Friend/Block
  FRIEND: '/friend',
  BLOCK: '/friend/block',

  // Match history
  MATCH: '/match',
  MATCH_BY_USER: '/match/by/user',

  // Achievement
  ACHIEVEMENT: '/achievement',
} as const;
