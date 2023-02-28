import { css } from '@emotion/css';
import { COLORS, makeTransition } from 'styles';

export const friendsListStyle = (isOpen: boolean) =>
  css({
    width: 250,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.BLACK,
    transition: makeTransition({ attrs: 'margin' }),
    marginLeft: !isOpen && -251,

    ul: {
      flex: 1,
      overflowX: 'hidden',
      overflowY: 'scroll',
    },
  });

export const friendsListTabWrapperStyle = css({
  width: '100%',
  textAlign: 'center',
  marginBottom: 10,
});

export const friendsListTabButtonStyle = (isCurrentTab: boolean) =>
  css({
    '&&': {
      border: 0,
      width: '50%',
      padding: '10px 0',
      opacity: !isCurrentTab && 0.5,
    },

    span: {
      color: COLORS.WHITE,
      fontWeight: isCurrentTab ? 700 : 400,
    },

    ':hover': {
      backgroundColor: isCurrentTab && COLORS.BLACK,
    },
  });
