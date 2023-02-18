import { css } from '@emotion/css';

export const registerPageWrapperStyle = css({
  width: 480,
  border: '1px solid black', // TODO: 상수화
  borderRadius: 5,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: 10,
});

export const registerPageLogoImageStyle = css({
  width: 280,
  height: 80,
  marginBottom: 30,
});

export const registerPageFormStyle = css({
  width: '100%',
});

export const registerPageInnerDivStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: 30,
  paddingRight: 30,
  width: 'calc(100% - 60px)',
  height: 70,

  label: {
    marginRight: 10,
  },

  input: {
    marginRight: 10,
  },

  img: {
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: 30,
  },
});

export const registerPageNicknameCheckButtonStyle = css({
  border: '1px solid black', // TODO : 색상 상수화
  borderRadius: 5,
  padding: '5px 10px',
});

export const registerPageButtonWrapperStyle = css({
  display: 'flex',
  flexDirection: 'row',
  height: 50,

  button: {
    borderTop: '1px solid black', // TODO : 색상 상수화
    width: '100%',
    height: '100%',
  },

  'button:first-child': {
    borderRight: '1px solid black', // TODO : 색상 상수화
  },
});
