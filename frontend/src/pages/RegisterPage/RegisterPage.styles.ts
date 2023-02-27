import { css } from '@emotion/css';

import { COLORS, COMMON_SIZES, FONT_SIZES, makeBorder } from 'styles';

export const registerPageFormStyle = css({
  width: 'calc(100% - 20px)',
  overflow: 'hidden',
  marginRight: 40,
});

export const registerPageInnerDivStyle = css({
  width: '100%',
  height: 50,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginBottom: 20,
  fontSize: FONT_SIZES.MEDIUM,

  'span, label': {
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.WHITE,
  },

  'input[type="file"]': {
    display: 'none',
  },
  'input[type="text"]': {
    marginLeft: 10,
  },

  img: {
    width: COMMON_SIZES.ICON_XLARGE,
    height: COMMON_SIZES.ICON_XLARGE,
    objectFit: 'cover',
    borderRadius: COMMON_SIZES.ICON_XLARGE,
  },
});

export const registerPageNicknameSectionWrapper = css({
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  svg: {
    position: 'absolute',
    right: 0,
    fill: COLORS.GREEN,
    width: COMMON_SIZES.ICON_SMALL,
    height: COMMON_SIZES.ICON_SMALL,
  },
});

export const registerPageImageUploadButtonStyle = css({
  border: makeBorder({ color: COLORS.WHITE }),
  borderRadius: COMMON_SIZES.BORDER_RADIUS_SMALL,
  padding: '5px 10px',
  marginLeft: 10,
  marginRight: 10,
});

export const registerPageButtonWrapperStyle = css({
  marginRight: 20,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',

  button: {
    border: makeBorder({ color: COLORS.WHITE }),
    borderRadius: COMMON_SIZES.BORDER_RADIUS_SMALL,
    padding: '10px 20px',
  },

  'button:first-child': {
    marginRight: 20,
  },

  'button > span': {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.LARGE,
  },
});
