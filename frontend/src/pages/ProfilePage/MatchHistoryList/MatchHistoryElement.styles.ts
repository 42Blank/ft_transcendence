import { css } from '@emotion/css';

import { COLORS, makeBorder } from 'styles';

export const matchHistoryWrapper = css({
  display: 'flex',
  flexDirection: 'row',
  width: 'calc(100% - 40px)',
  padding: '10px 20px',

  ':not(:last-child)': {
    borderBottom: makeBorder({ color: COLORS.WHITE_TRANSPARENT6 }),
  },
});
