export const ROUTE: Readonly<Record<string, string>> = {
  ROOT: '/',
  CHAT: '/chat',
  GAME: '/game',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/login/new',
};

export const API: Readonly<Record<string, string>> = {
  // Login
  FT_AUTH: '/auth/ft',
  SIGN_OUT: '/auth/signout',

  // User
  USER: '/users',
  USER_ME: '/users/me',
};
