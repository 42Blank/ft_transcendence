import { css } from '@emotion/css';

import { COMMON_SIZES } from 'styles';

export const sampleAvatarWrapper = css({
  width: COMMON_SIZES.ICON_XLARGE,
  height: COMMON_SIZES.ICON_XLARGE,
  borderRadius: COMMON_SIZES.BORDER_RADIUS_SMALL,
  overflow: 'hidden',
});

export const sampleAvatarButtonWrapper = css({
  width: COMMON_SIZES.ICON_XLARGE,
  height: COMMON_SIZES.ICON_XLARGE,

  '&&': {
    padding: 0,
  },
});
