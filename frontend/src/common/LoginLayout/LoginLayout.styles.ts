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

export const loginFooterStyle = css({
  width: '100vw',
  display: 'flex',
  position: 'fixed',
  left: 0,
  bottom: 0,
  padding: '20px 10px',
  flexDirection: 'row',
  justifyContent: 'center',
});

export const githubLinkStyle = css({
  display: 'inline-block',
  width: 40,
  height: 40,

  svg: {
    width: 40,
    height: 40,
  },
});
