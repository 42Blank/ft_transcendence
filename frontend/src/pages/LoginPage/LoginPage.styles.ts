import { css } from '@emotion/css';

export const loginPageWrapperStyle = css({
  width: 480,
  border: '1px solid black', // TODO: 상수화
  borderRadius: 5,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: 10,
  paddingBottom: 50,
});

export const loginPageLogoImageStyle = css({
  width: 280,
  height: 80,
  marginBottom: 30,
});

export const loginLinkStyle = css({
  textDecoration: 'none',
  backgroundColor: 'black',
  color: 'white', // TODO: 상수화
  display: 'flex',
  width: '50%',
  height: 50,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,

  span: {
    fontSize: 18,
    fontStyle: 'italic',
  },

  svg: {
    fill: 'white',
    width: 20,
    height: 20,
    marginLeft: 5,
    marginRight: 5,
  },
});
