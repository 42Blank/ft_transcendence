import { css } from '@emotion/css';

import { COLORS, COMMON_SIZES, FONT_SIZES, makeBorder, makeBoxShadow } from 'styles';

export const achievementElementWrapperStyle = (isAchieved: boolean) =>
  css({
    filter: isAchieved ? 'none' : 'grayscale(1)',
    opacity: isAchieved ? 1 : 0.7,
    width: 320,
    height: 120,
    padding: '20px 10px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE_TRANSPARENTA,
    border: makeBorder({}),
    borderRadius: COMMON_SIZES.BORDER_RADIUS_SMALL,
    boxShadow: makeBoxShadow({}),
    userSelect: 'none',
  });

export const achievementElementImageStyle = css({
  marginRight: 20,
});

export const achievementElementTextWrapperStyle = css({
  display: 'flex',
  flexDirection: 'column',
  wordBreak: 'keep-all',

  'span:first-child': {
    fontSize: FONT_SIZES.LARGE,
    fontWeight: 600,
    marginBottom: 10,
  },
});
