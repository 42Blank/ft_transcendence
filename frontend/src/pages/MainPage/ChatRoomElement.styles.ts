import { css } from '@emotion/css';

export const chatRoomElementStyle = css({
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid black`, // TODO: border color 상수화
  borderRadius: 5,
  overflow: 'hidden',

  h3: {
    fontWeight: 600,
    padding: 15,
    width: 'calc(100% - 30px)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

export const chatRoomImageSectionStyle = css({
  marginTop: 10,
  marginBottom: 10,
  width: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',

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

export const chatRoomTextSectionStyle = css({
  display: 'flex',
  flexDirection: 'row',
  padding: 15,

  span: {
    maxWidth: '70%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    lineHeight: 1.5,
  },

  'span:last-child': {
    marginLeft: 5,
    opacity: 0.5,
    width: '30%',
  },
});
