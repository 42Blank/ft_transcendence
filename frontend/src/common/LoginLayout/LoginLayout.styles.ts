import { css } from '@emotion/css';

import { COLORS, LOGIN_LEVELS, COMMON_SIZES } from 'styles';

export const loginLayoutScreenWrapperStyle = css({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const loginLayoutCenterAlignStyle = css({
  width: 500,
  height: 800,
  position: 'relative',

  '::before': {
    content: '""',
    position: 'absolute',
    bottom: 60,
    right: 0,
    backgroundColor: COLORS.BLACK,
    zIndex: LOGIN_LEVELS.MAIN_ZINDEX,
    borderRadius: COMMON_SIZES.BORDER_RADIUS_SMALL,
    width: 480,
    height: 480,
    transform: `rotate(${LOGIN_LEVELS.ROTATE_DEG}deg)`,
  },
});

export const loginLayoutImageStyle = (top: number, right: number) =>
  css({
    position: 'absolute',
    top,
    right,
    zIndex: LOGIN_LEVELS.IMAGE_ZINDEX,
  });

export const loginMainWrapperStyle = css({
  position: 'absolute',
  bottom: 120,
  left: 50,
  width: 480,
  height: 360,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  overflow: 'hidden',
  zIndex: LOGIN_LEVELS.MAIN_ZINDEX,
});

export const githubLinkStyle = css({
  display: 'inline-block',
  position: 'absolute',
  bottom: 0,
  right: 30,
  width: COMMON_SIZES.ICON_LARGE,
  height: COMMON_SIZES.ICON_LARGE,

  svg: {
    width: COMMON_SIZES.ICON_LARGE,
    height: COMMON_SIZES.ICON_LARGE,
  },
});
