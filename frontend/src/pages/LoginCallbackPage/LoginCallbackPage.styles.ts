import { css } from '@emotion/css';

export const loginCallbackWrapperStyle = css({
  width: 480,
  border: '1px solid black', // TODO: 상수화
  borderRadius: 5,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: 10,
  paddingBottom: 50,

  span: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});

export const loginCallbackLogoImageStyle = css({
  width: 280,
  height: 80,
  marginBottom: 30,
});
