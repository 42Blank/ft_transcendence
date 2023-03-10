import { css } from '@emotion/css';
import { COLORS, COMMON_SIZES, FONT_SIZES } from 'styles';

export const chatModalHeaderStyle = css({
  width: 'calc(100% - 60px)',
  height: 100,
  padding: '10px 30px',
  display: 'flex',
  flexDirection: 'row',
});

export const chatModalLeftStyle = css({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  width: 'calc(100% - 30px)',
});

export const chatModalTitleWrapperStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 5,

  h4: {
    fontSize: FONT_SIZES.LARGE,
    color: COLORS.WHITE,
  },
});

export const chatModalIconButtonStyle = css({
  marginLeft: 10,

  '&&': {
    padding: 0,
    width: COMMON_SIZES.ICON_MEDIUM,
    height: COMMON_SIZES.ICON_MEDIUM,

    ':hover': {
      background: COLORS.TRANSPARENT,
    },
  },

  svg: {
    width: COMMON_SIZES.ICON_MEDIUM,
    height: COMMON_SIZES.ICON_MEDIUM,
    fill: COLORS.WHITE_TRANSPARENTA,
  },
});

export const chatVisibilityWrapperStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 5,
});

export const chatVisibilitySpanStyle = css({
  fontSize: FONT_SIZES.MEDIUM,
  color: COLORS.WHITE,
});

export const chatVisibilityMiddleSpanStyle = css({
  fontSize: FONT_SIZES.MEDIUM,
  margin: '0 5px',
});

export const chatPasswordWrapperStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  label: {
    color: COLORS.WHITE,
    marginRight: 20,
  },
});

export const dropdownStyle = css({
  margin: '0 10px',
});
