import { css } from '@emotion/css';

import { COLORS, FONT_SIZES, makeButtonStyle } from 'styles';

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

  button: makeButtonStyle({ paddingHorizontal: 10, paddingVertical: 20 }),

  'button:first-child': {
    marginRight: 20,
  },

  'button > span': {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.LARGE,
  },
});
