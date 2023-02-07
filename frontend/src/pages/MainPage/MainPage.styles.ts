import { css } from '@emotion/css';

export const MainPageWrapperStyle = css({
  flex: 1,
  padding: 20,
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(2, 200px)',
  gap: 20,
});
