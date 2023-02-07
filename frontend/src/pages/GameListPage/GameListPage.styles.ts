import { css } from '@emotion/css';

export const gameListWrapperStyle = css({
  flex: 1,
  height: 'calc(100vh - 110px)',
  overflow: 'scroll',
  padding: 20,
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(3, 180px)',
  gap: 20,
});
