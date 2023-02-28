import { css } from '@emotion/css';

export const friendsListElementStyle = (state: string) =>
  css({
    position: 'relative',
    width: '100%',

    ':not(:last-child)': {
      borderBottom: '1px solid black', // TODO: border color
    },

    a: {
      display: 'flex',
      width: 'calc(100% - 20px)',
      padding: '5px 10px',
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
      border: '2px solid white', // TODO: 상수화
      borderRadius: 10,
    },
  });

export const friendsListImageStyle = css`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 25px;
  margin-right: 20px;
`;

export const friendsListNameStyle = css`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 18px;
`;

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
