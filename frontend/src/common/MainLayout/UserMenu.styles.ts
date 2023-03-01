import { css } from '@emotion/css';
import { COLORS, COMMON_SIZES, FONT_SIZES, makeBorder } from 'styles';

export const userMenuWrapperStyle = css({
  display: 'flex',
  position: 'relative',
  width: 200,
  height: '100%',
  alignItems: 'center',
  justifyContent: 'flex-end',

  img: {
    width: COMMON_SIZES.ICON_LARGE,
    height: COMMON_SIZES.ICON_LARGE,
    marginRight: 10,
  },

  ':hover': {
    cursor: 'pointer',
  },
});

export const userMenuNameStyle = css({
  maxWidth: 150,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: COLORS.WHITE,
  fontSize: FONT_SIZES.MEDIUM,
  userSelect: 'none',
});

export const userMenuInnerStyle = (isMenuShown: boolean) =>
  css({
    zIndex: 2, // TODO: zindex 상수화
    backgroundColor: COLORS.WHITE,
    position: 'absolute',
    display: isMenuShown ? 'flex' : 'none',
    border: makeBorder({}),
    borderRadius: 5,
    overflow: 'hidden',
    right: 0,
    top: 50,
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    width: 90,
  });

export const userMenuHoverButton = css({
  '&&': {
    width: '100%',
    padding: 10,
  },

  ':first-child': {
    borderBottom: makeBorder({}),
  },

  ':hover': {
    backgroundColor: COLORS.GRAYE,
  },
});
