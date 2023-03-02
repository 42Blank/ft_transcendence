import { css } from '@emotion/css';

import { COLORS } from 'styles';

export const buttonWrapperStyle = css({
  background: COLORS.TRANSPARENT,
  border: 0,
  padding: '5px 10px',
  transition: 'background-color 0.2s ease-in',

  span: {
    userSelect: 'none',
    color: COLORS.WHITE,
  },

  ':hover': {
    backgroundColor: COLORS.GRAY3,
    cursor: 'pointer',
  },
});
