import { css } from '@emotion/css';
import { COLORS, makeTransition } from 'styles';

export const friendsListStyle = (isOpen: boolean) =>
  css({
    width: 250,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: makeTransition({ attrs: 'margin' }),
    marginLeft: !isOpen && -251,
    overflow: 'hidden',
  });

export const friendsListTabWrapperStyle = css({
  width: '100%',
  height: 40,
  textAlign: 'center',
});

export const friendsListTabButtonStyle = (isCurrentTab: boolean) =>
  css({
    '&&': {
      border: 0,
      borderRadius: 0,
      padding: 0,
      width: '50%',
      height: '100%',
      backgroundColor: isCurrentTab ? COLORS.BLACK_TRANSPARENTC : COLORS.BLACK_TRANSPARENT9,
    },

    span: {
      color: COLORS.WHITE,
      opacity: isCurrentTab ? 1 : 0.7,
      fontWeight: isCurrentTab ? 700 : 400,
    },

    ':hover': {
      backgroundColor: !isCurrentTab && COLORS.BLACK_TRANSPARENTA,
    },
  });

export const friendsListWrapperStyle = css({
  backgroundColor: COLORS.BLACK_TRANSPARENTC,
  flex: 1,
  overflowX: 'hidden',
  overflowY: 'scroll',
});
