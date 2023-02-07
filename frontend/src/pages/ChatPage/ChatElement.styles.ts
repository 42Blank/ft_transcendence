import { css } from '@emotion/css';

export const chatElementWrapper = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
});

export const chatProfileWrapper = css({
  marginRight: 15,
  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export const chatMessageWrapper = css({
  backgroundColor: 'white', // TODO: 상수화

  span: {},
});

export const chatTimestampWrapper = css({
  fontSize: 10, // TODO: 상수화
});
