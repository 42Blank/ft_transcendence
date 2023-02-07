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
});

export const userMenuInnerStyle = (isMenuShown: boolean) =>
  css({
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
      border: 'none',
      background: 'none',
      padding: '10px 20px',
      width: '100%',
      transition: 'background-color 0.2s ease-in-out',

      '&:first-child': {
        borderBottom: `1px solid black`, // TODO: border color
      },

      ':hover': {
        backgroundColor: 'lightgray', // TODO: background hover color
        cursor: 'pointer',
      },
    },
  });
