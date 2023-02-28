import { css } from '@emotion/css';

import { COLORS, COMMON_SIZES, makeBorder } from 'styles';

export const buttonWrapperStyle = css({
  backgroundColor: COLORS.BLACK,
  padding: '5px 10px',
  border: makeBorder({ color: COLORS.WHITE }),
  borderRadius: COMMON_SIZES.BORDER_RADIUS_SMALL,
  transition: 'background-color 0.2s ease-in',

  span: {
    color: COLORS.WHITE,
  },

  ':hover': {
    backgroundColor: COLORS.GRAY3,
    cursor: 'pointer',
  },
});
