import { css } from '@emotion/css';

import { COLORS, COMMON_SIZES, FONT_SIZES, makeBorder } from 'styles';

export const registerPageFormStyle = css({
  width: '100%',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const registerProfileInnerStyle = css({
  width: '50%',
  height: 50,
  marginBottom: 20,
});

export const registerPageButtonWrapperStyle = css({
  width: '50%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
});

export const registerPageButtonStyle = css({
  '&&': {
    padding: '10px 20px',
    border: makeBorder({}),
    borderRadius: COMMON_SIZES.BORDER_RADIUS_SMALL,
  },

  ':first-child': {
    marginRight: 20,
  },

  span: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.LARGE,
  },
});
