import { css } from '@emotion/css';
import { COLORS, makeBorder, makeTransition } from 'styles';

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
      left: 45,
      width: 12,
      height: 12,
      backgroundColor: getStateColor(state),
      border: makeBorder({ width: 2 }),
      borderRadius: 20,
    },

    ':hover': {
      backgroundColor: COLORS.GRAY3,
    },
  });

export const friendsListImageStyle = css({
  marginRight: 20,
});

function getStateColor(
  state: string,
): string[] | import('csstype').Property.BackgroundColor | import('csstype').Property.BackgroundColor[] {
  // 김es-lint씨가 자동완성 이렇게 해줬는데 이렇게 써야하는거 맞을까?
  if (state === 'online') {
    return 'green';
  }
  if (state === 'chatting') {
    return 'yellow';
  }
  if (state === 'playing') {
    return 'orange';
  }
  return 'gray';
}
export const friendsListNameStyle = css({
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  lineHeight: 1.5,
  color: COLORS.WHITE,
});
