import { css } from '@emotion/css';

import { COLORS, FONT_SIZES } from 'styles';

export const matchHistoryWrapperDivStyle = css({
  width: 'calc(100% - 40px)',
  flex: 1,
  padding: 20,
  overflow: 'hidden',
  backgroundColor: COLORS.BLACK_TRANSPARENT3,
});

export const matchHistoryWrapperStyle = css({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'hidden',
  overflowY: 'scroll',
});

export const matchHistoryLoadingStyle = css({
  display: 'inline-block',
  padding: '0 20px',
  color: COLORS.WHITE,
  fontSize: FONT_SIZES.LARGE,
  fontStyle: 'italic',
});
