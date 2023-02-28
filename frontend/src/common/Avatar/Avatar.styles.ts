import { css } from '@emotion/css';

import { COLORS, makeBorder } from 'styles';

export const avatarImageStyle = css({
  borderRadius: '100vw',
  objectFit: 'cover',
  backgroundColor: COLORS.WHITE,
  border: makeBorder({}),
});
