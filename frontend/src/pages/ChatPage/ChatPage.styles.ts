import { css } from '@emotion/css';
import { COLORS, COMMON_SIZES, FONT_SIZES, makeBorder } from 'styles';

export const chatPageWrapperStyle = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  height: '100%',
  background: COLORS.BLACK_TRANSPARENT6,
});

export const chatPageTitleStyle = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: COLORS.BLACK_TRANSPARENTA,
  padding: 20,
});

export const chatPageTitleLeftSectionStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  svg: {
    width: COMMON_SIZES.ICON_SMALL,
    height: COMMON_SIZES.ICON_SMALL,
    marginRight: 10,
  },

  span: {
    fontSize: FONT_SIZES.LARGE,
    color: COLORS.WHITE,
  },
});

export const chatPageMenuButtonStyle = css({
  width: COMMON_SIZES.ICON_MEDIUM,
  height: COMMON_SIZES.ICON_MEDIUM,
  marginLeft: 10,

  '&&': {
    border: 0,
    padding: 0,
    background: 0,

    ':hover': {
      background: 0,
    },
  },

  svg: {
    fill: COLORS.WHITE,
    width: COMMON_SIZES.ICON_MEDIUM,
    height: COMMON_SIZES.ICON_MEDIUM,
  },
});

export const chatPageListWrapperStyle = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column-reverse',
  overflowX: 'hidden',
  overflowY: 'scroll',
});

export const chatPageModalStyle = css({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: COLORS.BLACK,
  border: makeBorder({}),
});
