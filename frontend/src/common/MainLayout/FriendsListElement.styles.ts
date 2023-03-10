import { css } from '@emotion/css';
import { COLORS, makeBorder, makeTransition } from 'styles';

function getStateColor(state: string) {
  return (
    {
      online: COLORS.GREEN,
      chatting: COLORS.YELLOW,
      playing: COLORS.ORANGE,
    }[state] ?? COLORS.GRAY3
  );
}

export const friendsListElementStyle = (state: string) =>
  css({
    position: 'relative',
    width: '100%',
    transition: makeTransition({ attrs: 'background-color' }),

    ':not(:last-child)': {
      borderBottom: makeBorder({ color: COLORS.GRAY5 }),
    },

    a: {
      display: 'flex',
      width: 'calc(100% - 20px)',
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      color: 'black',
      textDecoration: 'none',
    },

    '::after': {
      content: `""`,
      position: 'absolute',
      display: 'block',
      bottom: 5,
      left: 40,
      width: 12,
      height: 12,
      backgroundColor: getStateColor(state),
      border: makeBorder({ width: 2 }),
      borderRadius: 20,
    },

    ':hover': {
      backgroundColor: COLORS.BLACK_TRANSPARENT3,
    },
  });

export const friendsListImageStyle = css({
  marginRight: 15,
});

export const friendsListNameStyle = css({
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  lineHeight: 1.5,
  color: COLORS.WHITE,
});
