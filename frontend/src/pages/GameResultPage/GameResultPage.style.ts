import { css } from '@emotion/css';
import { COLORS, COMMON_SIZES, FONT_SIZES, makeBorder } from 'styles';

export const gameResultPageWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 'calc(100% - 40px)',
  padding: '150px 20px',

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
    margin: '0 60px',
  },
});

export const gameResultMatchWrapper = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
});

export const gameResultButtonWrapper = css({
  margin: 40,
});

export const gameResultPageMatchPointWinWrapper = css({
  display: 'inline-block',
  flex: 1,
  textAlign: 'right',
  fontWeight: 600,
  fontSize: FONT_SIZES.XLARGE,
  color: COLORS.YELLOW,
  marginTop: 10,
});

export const gameResultPageMatchPointLoseWrapper = css({
  display: 'inline-block',
  flex: 1,
  textAlign: 'left',
  fontWeight: 600,
  fontSize: FONT_SIZES.XLARGE,
  color: COLORS.GRAY5,
  marginTop: 10,
});

export const gameResultPointStyle = css({
  fontWeight: 600,
  fontSize: FONT_SIZES.MEDIUM,
  color: COLORS.GRAYC,
  margin: '10px 100px',
  paddingTop: 10,
});
