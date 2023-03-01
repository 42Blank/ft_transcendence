import { css } from '@emotion/css';

import { COLORS, COMMON_SIZES, makeBorder } from 'styles';

export const dropdownWrapperStyle = css({
  position: 'relative',
  backgroundColor: COLORS.BLACK,
  width: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
});

export const dropdownTopValueStyle = (isShown: boolean) =>
  css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    border: makeBorder({}),
    padding: 5,

    span: {
      color: COLORS.WHITE,
    },

    svg: {
      transform: isShown ? 'rotate(0.5turn)' : 'none',
      width: COMMON_SIZES.ICON_SMALL,
      height: COMMON_SIZES.ICON_SMALL,
      fill: COLORS.WHITE_TRANSPARENTA,
    },
  });

export const dropdownListStyle = (isShown: boolean) =>
  css({
    zIndex: 2,
    backgroundColor: COLORS.BLACK,
    display: isShown ? 'flex' : 'none',
    position: 'absolute',
    left: 0,
    top: 30,
    border: makeBorder({}),
    flexDirection: 'column',
    width: 'calc(100% - 2px)',
  });

export const dropdownListInnerButtonStyle = css({
  '&&': {
    width: '100%',
    padding: '3px 5px',
  },

  ':hover': {
    backgroundColor: COLORS.GRAY3,
  },
});

export const dropdownListInnerStyle = css({
  borderBottom: makeBorder({}),

  ':last-child': {
    borderBottom: 0,
  },
});
