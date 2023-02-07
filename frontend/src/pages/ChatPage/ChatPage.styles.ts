import { css } from '@emotion/css';

export const chatPageWrapperStyle = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'scroll',
  height: 'calc(100vh - 70px)',
  backgroundColor: 'gray', // TODO: 상수화
});

export const chatPageTitleStyle = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'white', // TODO: 상수화
  padding: 20,
  borderBottom: '1px solid black', // TODO: 상수화

  span: {
    fontSize: 20, // TODO: 상수화
  },
});

export const chatPageListWrapperStyle = css({
  flex: 1,
  overflow: 'scroll',
});

export const chatInputStyle = css({
  height: 60,
  padding: '0 20px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'white', // TODO: 상수화
  borderTop: '1px solid black', // TODO: 상수화
});
