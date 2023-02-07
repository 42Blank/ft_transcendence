import { css } from '@emotion/css';

export const chatElementWrapper = (isMine: boolean) =>
  css({
    padding: 10,
    overflow: 'hidden',
    width: 'calc(100% - 20px)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: isMine ? 'flex-end' : 'flex-start',
    alignItems: 'flex-start',
  });

export const chatProfileWrapper = css({
  width: 70,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginRight: 20,

  img: {
    width: 50,
    height: 50,
    objectFit: 'cover',
    border: `2px solid white`, // TODO: 상수화
    borderRadius: 25,
  },

  span: {
    marginTop: 3,
    width: 70,
    lineHeight: 1.5,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
});

export const chatBodyWrapper = css({
  maxWidth: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
});

export const chatTimestampWrapper = (isMine: boolean) =>
  css({
    textAlign: isMine ? 'end' : 'start',
    margin: isMine ? '0 10px 0 0' : '0 0 0 10px',
    width: 80,
    marginBottom: 5,
    fontSize: 10, // TODO: 상수화
    opacity: 0.5,
  });

export const chatMessageWrapper = css({
  backgroundColor: 'white', // TODO: 상수화
  borderRadius: 5,
  padding: 10,
  height: 'fit-content',
  flex: 1,
  marginTop: 10,

  span: {},
});
