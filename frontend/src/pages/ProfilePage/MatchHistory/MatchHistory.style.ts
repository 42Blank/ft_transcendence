import { css } from '@emotion/css';

export const matchHistoryContainerStyle = css({
  display: 'grid',
  gridTemplateAreas: `
  'winner loser'
  'time time'`,
});

export const matchHistoryWinnerStyle = css`
  background-color: #bbdefb;
  border: 1px solid black;
`;

export const matchHistoryLoserStyle = css`
  background-color: #ef9a9a;
  border: 1px solid black;
`;