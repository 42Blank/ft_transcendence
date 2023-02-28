import { css } from '@emotion/css';

import { COLORS, COMMON_SIZES, makeBorder } from 'styles';

export const avatarImageStyle = css({
  width: COMMON_SIZES.ICON_XLARGE,
  height: COMMON_SIZES.ICON_XLARGE,
  objectFit: 'cover',
  borderRadius: 30,
  marginRight: 20,
  backgroundColor: COLORS.WHITE,
  border: makeBorder({}),
});
