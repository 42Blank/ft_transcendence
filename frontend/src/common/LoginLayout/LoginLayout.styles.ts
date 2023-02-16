import { css } from '@emotion/css';

export const loginHeaderStyle = css({
  width: '100vw',
  height: 350,
  display: 'flex',
  justifyContent: 'center',
  marginTop: 20,
});

export const loginMainWrapperStyle = css({
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
});

export const loginFooterStyle = css({
  width: '100vw',
  display: 'flex',
  position: 'fixed',
  left: 0,
  bottom: 0,
  padding: '20px 10px',
  flexDirection: 'row',
  justifyContent: 'center',
});

export const githubLinkStyle = css({
  display: 'inline-block',
  width: 40,
  height: 40,

  svg: {
    width: 40,
    height: 40,
  },
});
