import { css } from '@emotion/css';

import { COLORS, COMMON_SIZES, FONT_SIZES, makeBorder } from 'styles';

export const userBoxWrapperStyle = (isRight: boolean) =>
  css({
    display: 'flex',
    flexDirection: isRight ? 'row' : 'row-reverse',
    alignItems: 'flex-end',
  });

export const userBoxAvatarWrapperStyle = css({
  position: 'relative',
  overflow: 'hidden',
  border: makeBorder({}),
  width: COMMON_SIZES.ICON_XXLARGE,
  height: COMMON_SIZES.ICON_XXLARGE,
  borderRadius: COMMON_SIZES.ICON_XXLARGE,
});

export const userBoxTagStyle = (isWon: boolean) =>
  css({
    position: 'absolute',
    top: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 20,
    padding: '3px 0',
    backgroundColor: isWon ? COLORS.YELLOW : COLORS.GRAY7,
    zIndex: 2,

    span: {
      color: isWon ? COLORS.BLACK : COLORS.WHITE,
      fontWeight: 600,
    },
  });

export const userAvatarStyle = (isWon: boolean) =>
  css({
    filter: isWon ? 'none' : 'grayscale(1)',
    opacity: isWon ? 1 : 0.7,
  });

export const userBoxNicknameStyle = css({
  margin: '0 20px',
  fontSize: FONT_SIZES.MEDIUM,
  color: COLORS.GRAYE,
  fontWeight: 600,
  marginBottom: 10,
});
