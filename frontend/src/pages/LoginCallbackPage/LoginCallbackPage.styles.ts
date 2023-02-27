import { css } from '@emotion/css';
import { COLORS, FONT_SIZES } from 'styles';

export const loginCallbackWrapperStyle = css({
  color: COLORS.WHITE,
  display: 'flex',
  marginRight: 20,
  justifyContent: 'flex-end',
  alignItems: 'center',

  span: {
    fontSize: FONT_SIZES.XLARGE,
    fontStyle: 'italic',
    color: COLORS.WHITE,
  },
});
