import { css } from '@emotion/css';

import { COLORS, COMMON_SIZES, FONT_SIZES } from 'styles';

export const loginLinkStyle = css({
  textDecoration: 'none',
  color: COLORS.WHITE,
  paddingRight: 60,
  marginTop: -10,
  display: 'flex',
  width: 'calc(100% - 60px)',
  height: 70,
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  borderRadius: COMMON_SIZES.BORDER_RADIUS_SMALL,

  span: {
    fontSize: FONT_SIZES.XLARGE,
    fontStyle: 'italic',
  },

  svg: {
    fill: COLORS.WHITE,
    width: COMMON_SIZES.ICON_MEDIUM,
    height: COMMON_SIZES.ICON_MEDIUM,
    marginLeft: 10,
    marginRight: 10,
  },
});

export const loginPageLogoImageStyle = css({
  width: 280,
  height: 80,
  marginBottom: 30,
});
