import { css } from '@emotion/css';

export const friendsListElementStyle = (isOnline: boolean) =>
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
      display: isOnline ? 'block' : 'none',
      bottom: 5,
      left: 45,
      width: 12,
      height: 12,
      backgroundColor: 'green', // TODO: 상수화
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
`;
