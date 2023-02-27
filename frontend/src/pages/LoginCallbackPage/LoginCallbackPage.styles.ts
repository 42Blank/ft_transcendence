import { css } from '@emotion/css';
import { COLORS, FONT_SIZES } from 'styles';

export const loginCallbackWrapperStyle = css({
  color: COLORS.WHITE,
  paddingRight: 60,
  marginTop: -10,
  display: 'flex',
  width: 'calc(100% - 60px)',
  height: 70,
  justifyContent: 'flex-end',
  alignItems: 'center',

  span: {
    fontSize: FONT_SIZES.XLARGE,
    fontStyle: 'italic',
    color: COLORS.WHITE,
  },
});
