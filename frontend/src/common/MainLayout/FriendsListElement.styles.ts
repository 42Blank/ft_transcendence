import { css } from '@emotion/css';

export const friendsListElementStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: `5px 10px`,
});

export const friendsListImageStyle = css({
  width: 50,
  height: 50,
  borderRadius: 25,
  marginRight: 20,
});

export const friendsListNameStyle = css({
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
