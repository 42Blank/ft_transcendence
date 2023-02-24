import { css } from '@emotion/css';

export const profileContainerStyle = css({
  display: 'grid',
  width: '100vw',
  height: '100vh',
  gridTemplateAreas: `
  'card card'
  'hist achv'
  'hist achv'`,
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '1fr 1fr 1fr',
});

export const cardStyle = css({
  gridArea: 'card',
  borderBottom: '1px solid black',
});

export const histStyle = css({
  gridArea: 'hist',
  borderRight: '1px solid black',
});

export const achvStyle = css({
  gridArea: 'achv',
});
