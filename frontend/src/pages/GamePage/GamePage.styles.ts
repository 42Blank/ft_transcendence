import { css } from '@emotion/css';
import { COLORS, makeBorder } from 'styles';

export const waitGameWrapperStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,

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
