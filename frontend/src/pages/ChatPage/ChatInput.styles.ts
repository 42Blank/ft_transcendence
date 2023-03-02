import { css } from '@emotion/css';

import { COLORS, COMMON_SIZES } from 'styles';

export const chatInputStyle = css({
  height: 60,
  backgroundColor: COLORS.BLACK_TRANSPARENTA,
  padding: '0 20px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  input: {
    flex: 1,
  },
});

export const buttonStyle = css({
  width: COMMON_SIZES.ICON_LARGE,
  height: COMMON_SIZES.ICON_LARGE,
  marginLeft: 20,

  '&&': {
    padding: 0,
    border: 0,
    borderRadius: 0,

    ':hover': {
      background: COLORS.TRANSPARENT,
    },
  },

  svg: {
    width: COMMON_SIZES.ICON_LARGE,
    height: COMMON_SIZES.ICON_LARGE,
    fill: COLORS.GRAYE,
  },
});
