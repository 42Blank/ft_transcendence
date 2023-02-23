import { css } from '@emotion/css';

export const matchHistoryContainerStyle = css({
  display: 'grid',
  padding: '0.5rem',
  gridTemplateAreas: `
  'winner loser'
  'time time'`,
  gridTemplateColumns: '1fr 1fr',
  '& .time': {
    gridArea: 'time',
  },
  borderBottom: '1px solid black',
});

export const matchHistoryBoxStyle = css({
  border: '1px solid black',
  display: 'grid',
  gridTemplateAreas: `
  'img win'
  'name name'`,
  '& .win-lose': {
    textAlign: 'center',
    marginTop: '50px',
  },
  '& .nick': {
    marginLeft: '0.3rem',
  },
});

export const matchAvatarStyle = css({
  height: '100px',
  width: '100px',
  borderRadius: '50%',
  margin: '0.3rem',
});
