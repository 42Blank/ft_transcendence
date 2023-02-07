import { css } from '@emotion/css';

export const friendsListStyle = css({
  width: 250,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRight: `1px solid black`, // TODO: border color

  ul: {
    flex: 1,
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
});

export const friendsListTitleStyle = css({
  width: '100%',
  textAlign: 'center',
  padding: '10px 0',
  borderBottom: `1px solid black`, // TODO: border color
});
