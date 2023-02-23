import { css } from '@emotion/css';

export const profileContainerStyle = css({
  display: 'grid',
  padding: '0.5rem',
  width: '100vw',
  height: '100vh',
  gridTemplateAreas: `
  'card card'
  'hist achv'`,
});

export const cardStyle = css({
  gridArea: 'card',
});

export const histStyle = css({
  gridArea: 'hist',
});

export const achvStyle = css({
  gridArea: 'achv',
});
