import { css } from '@emotion/css';

import { COLORS, COMMON_SIZES, FONT_SIZES, makeBorder, makeButtonStyle } from 'styles';

export const registerPageFormStyle = css({
  width: '100%',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const registerPageInnerDivStyle = css({
  width: '50%',
  height: 50,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
  fontSize: FONT_SIZES.MEDIUM,

  'input[type="file"]': {
    display: 'none',
  },
  'input[type="text"]': {
    marginLeft: 10,
    width: 100,
    paddingRight: 30,
    backgroundColor: COLORS.BLACK,
    border: 'none',
    borderBottom: makeBorder({ color: COLORS.WHITE }),
    color: COLORS.WHITE,

    ':placeholder': {
      color: COLORS.GRAY3,
    },
  },

  img: {
    width: COMMON_SIZES.ICON_XLARGE,
    height: COMMON_SIZES.ICON_XLARGE,
    objectFit: 'cover',
    borderRadius: COMMON_SIZES.ICON_XLARGE,
  },
});

export const registerPageLabelStyle = css({
  fontSize: FONT_SIZES.MEDIUM,
  color: COLORS.WHITE,
  width: 80,
  marginRight: 10,
});

export const registerPageNicknameSectionWrapper = css({
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  svg: {
    position: 'absolute',
    right: 5,
    top: 12,
    fill: COLORS.GREEN,
    width: COMMON_SIZES.ICON_SMALL,
    height: COMMON_SIZES.ICON_SMALL,
  },
});

export const registerPageImageUploadButtonStyle = css({
  ...makeButtonStyle({}),
  marginLeft: 10,
  marginRight: 20,
  color: COLORS.WHITE,
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
