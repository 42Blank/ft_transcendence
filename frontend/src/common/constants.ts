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
  LOGIN_2FA: '/login/2fa',
  LOGIN_2FA_CHECK: '/login/2fa/callback',
} as const;

export const API = {
  // Login
  FT_AUTH: '/auth/ft',
  FT_AUTH_CALLBACK: '/auth/ft/callback',
  FT_AUTH_RANDOM: '/auth/ft/random',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  SIGN_OUT: '/auth/signout',
  AUTH_2FA: '/auth/2fa',
  AUTH_2FA_CALLBACK: '/auth/2fa/callback',
  TWO_FACTOR_AUTH: '/auth/two-factor-auth',

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

  // File
  FILE_UPLOAD: '/file/upload',
} as const;

export const DEFAULT_IMAGE_URL = 'https://bit.ly/3YMBEvR';
export const LOADING_IMAGE_URL = 'https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif';
export const UNKNOWN_IMAGE_URL = '/unknown_user.png';
