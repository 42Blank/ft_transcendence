import { css } from '@emotion/css';

export const chatRoomElementStyle = css({
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid black`, // TODO: border color 상수화
  borderRadius: 5,

  h3: {
    fontWeight: 600,
    padding: '10px 0',
  },
});

export const chatRoomImageSectionStyle = css({
  marginTop: 10,
  marginBottom: 10,
  img: {
    width: 50,
    height: 50,
    border: `2px solid white`, // TODO: border color 상수화
    objectFit: 'cover',
    borderRadius: 25,

    ':not(:last-child)': {
      marginRight: -15,
    },
  },
});
