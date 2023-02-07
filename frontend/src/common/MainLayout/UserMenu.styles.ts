import { css } from '@emotion/css';

export const userMenuWrapperStyle = css({
  display: 'flex',
  position: 'relative',
  width: 100,
  height: '100%',
  alignItems: 'center',
  justifyContent: 'flex-end',

  span: {
    userSelect: 'none',
  },

  ':hover': {
    cursor: 'pointer',
  },
});

export const userMenuInnerStyle = (isMenuShown: boolean) =>
  css({
    zIndex: 2, // TODO: zindex 상수화
    backgroundColor: 'white', // TODO: color 상수화
    position: 'absolute',
    display: isMenuShown ? 'flex' : 'none',
    border: `1px solid black`, // TODO: border color
    borderRadius: 5,
    overflow: 'hidden',
    right: 0,
    top: 45,
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    width: 90,

    button: {
      padding: 10,
      width: '100%',
      transition: 'background-color 0.2s ease-in-out',

      '&:first-child': {
        borderBottom: `1px solid black`, // TODO: border color
      },

      ':hover': {
        backgroundColor: 'lightgray', // TODO: background hover color
      },
    },
  });
