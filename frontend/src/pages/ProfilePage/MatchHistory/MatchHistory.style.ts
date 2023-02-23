import { css } from '@emotion/css';

export const matchHistoryContainerStyle = css({
  display: 'grid',
  paddingBottom: '0.5rem',
  gridTemplateAreas: `
  'winner loser'
  'time time'`,
  gridTemplateColumns: '1fr 1fr',
});

export const matchHistoryBoxStyle = css({
  border: '1px solid black',
  display: 'grid',
  gridTemplateAreas: `
  'img win'
  'name name'`,
  textAlign: 'center',
  '& .win-lose': {
    marginTop: '50px',
  },
});

export const matchAvatarStyle = css({
  height: '100px',
  width: '100px',
  borderRadius: '50%',
  margin: '0.3rem',
});
