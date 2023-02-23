import { css } from '@emotion/css';

export const profileContainerStyle = css({
  display: 'grid',
  width: '100vw',
  height: '100vh',
  gridTemplateAreas: `
  'card card'
  'hist achv'`,
});

export const cardStyle = css({
  gridArea: 'card',
  padding: '0.5rem',
  borderBottom: '1px solid black',
});

export const histStyle = css({
  gridArea: 'hist',
  padding: '0.5rem',
  borderRight: '1px solid black',
});

export const achvStyle = css({
  gridArea: 'achv',
  padding: '0.5rem',
});
