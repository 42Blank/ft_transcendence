import { css } from '@emotion/css';

export const matchHistoryContainerStyle = css({
  display: 'grid',
  paddingBottom: '0.5rem',
  gridTemplateAreas: `
  'winner loser'
  'time time'`,
  gridTemplateColumns: '1fr 1fr',
});

export const matchHistoryWinnerStyle = css({
  border: '1px solid black',
});

export const matchHistoryLoserStyle = css({
  border: '1px solid black',
});
