import { css } from '@emotion/css';

import { COLORS, COMMON_SIZES, makeBorder } from 'styles';

export const matchHistoryWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 'calc(100% - 40px)',
  padding: 20,

  ':not(:last-child)': {
    borderBottom: makeBorder({ color: COLORS.WHITE_TRANSPARENT6 }),
  },

  ':first-child': {
    paddingTop: 0,
  },

  svg: {
    width: COMMON_SIZES.ICON_LARGE,
    height: COMMON_SIZES.ICON_LARGE,
    fill: COLORS.GRAYC,
    margin: '0 20px',
  },
});

export const matchHistoryTimeWrapper = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 20,

  span: {
    color: COLORS.GRAYC,
  },

  'span:first-child': {
    fontWeight: 500,
    color: COLORS.GRAYE,
    marginRight: 10,
  },
});

export const matchHistoryUserWrapper = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});
