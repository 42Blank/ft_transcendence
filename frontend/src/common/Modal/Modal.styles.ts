import { css } from '@emotion/css';

import { COLORS, COMMON_SIZES, makeBorder } from 'styles';

export const modalBackgroundStyle = css({
  position: 'fixed',
  left: 0,
  top: 0,
  zIndex: 5,
  width: '100vw',
  height: '100vh',
  backdropFilter: 'blur(5px)',
  backgroundColor: COLORS.BLACK_TRANSPARENT3,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const modalInnerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  width: 480,
  height: 320,
  zIndex: 10,
  backgroundColor: COLORS.BLACK,
  border: makeBorder({}),
  borderRadius: COMMON_SIZES.BORDER_RADIUS_SMALL,
});
