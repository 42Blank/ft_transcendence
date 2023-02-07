import { css } from '@emotion/css';

export const MainPageWrapperStyle = css({
  flex: 1,
  height: 'calc(100vh - 110px)',
  overflowX: 'hidden',
  overflowY: 'scroll',
  padding: 20,
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(3, 180px)',
  gap: 20,
});
