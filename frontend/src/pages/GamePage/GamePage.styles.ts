import { css } from '@emotion/css';
import { COLORS, makeBorder } from 'styles';

export const waitGameWrapperStyle = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',

  ':not(:last-child)': {
    borderBottom: makeBorder({ color: COLORS.WHITE_TRANSPARENT6 }),
  },

  svg: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
});

export const waitGameTitleStyle = css({
  fontSize: 25,
  marginBottom: 15,
});
