import { css } from '@emotion/css';

import { COLORS, COMMON_SIZES, FONT_SIZES, makeBorder } from 'styles';

export const loginLinkStyle = css({
  textDecoration: 'none',
  marginTop: 10,
  color: COLORS.WHITE,
  display: 'flex',
  padding: '20px 40px',
  border: makeBorder({}),
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
