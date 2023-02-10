import { css } from '@emotion/css';

export const chatPageWrapperStyle = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  height: 'calc(100vh - 70px)',
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
  overflowX: 'hidden',
  overflowY: 'scroll',
});

export const closeButtonStyle = css`
  border: 1px solid black; // TODO: 색상 상수화
`;
