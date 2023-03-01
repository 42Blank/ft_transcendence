import { css } from '@emotion/css';

import { COLORS, COMMON_SIZES, makeBorder, makeBoxShadow } from 'styles';

export const achievementElementWrapperStyle = css({
  width: 240,
  height: 120,
  padding: '20px 10px',
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: COLORS.WHITE_TRANSPARENTA,
  border: makeBorder({}),
  borderRadius: COMMON_SIZES.BORDER_RADIUS_SMALL,
  boxShadow: makeBoxShadow({}),
});
