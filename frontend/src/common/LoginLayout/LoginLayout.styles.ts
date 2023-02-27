import { css } from '@emotion/css';

import { COLORS, LOGIN_LEVELS, COMMON_SIZES } from 'styles';

export const loginLayoutWrapperStyle = css({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  userSelect: 'none',
});

export const loginLayoutCenterAlignStyle = css({
  marginTop: 60,
  width: 500,
  height: 800,
  position: 'relative',
});

export const loginLayoutImageStyle = (top: number, right: number) =>
  css({
    position: 'absolute',
    top,
    right,
    // right: `calc(50% - ${right}px`,
    zIndex: LOGIN_LEVELS.IMAGE_ZINDEX,
  });

export const loginMainWrapperStyle = css({
  position: 'absolute',
  bottom: 60,
  right: 0,
  zIndex: LOGIN_LEVELS.MAIN_ZINDEX,
  backgroundColor: COLORS.BLACK,
  borderRadius: COMMON_SIZES.BORDER_RADIUS_SMALL,
  width: 480,
  height: 480,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transform: `rotate(${LOGIN_LEVELS.ROTATE_DEG}deg)`,
});

export const loginMainInnerStyle = css({
  marginTop: 50,
  width: '100%',
  transform: `rotate(-${LOGIN_LEVELS.ROTATE_DEG}deg)`,
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
