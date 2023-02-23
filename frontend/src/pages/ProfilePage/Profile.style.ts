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
  borderBottom: '2px solid black',
});

export const histStyle = css({
  gridArea: 'hist',
  borderRight: '2px solid black',
});

export const achvStyle = css({
  gridArea: 'achv',
});
