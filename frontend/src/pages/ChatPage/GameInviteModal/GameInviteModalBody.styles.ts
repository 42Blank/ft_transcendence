import { css } from '@emotion/css';
import { COLORS } from 'styles';

export const inviteGameFormStyle = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  color: COLORS.WHITE,
});

export const inviteGameTitleStyle = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: COLORS.BLACK_TRANSPARENT3,
  color: COLORS.WHITE,
  padding: 20,
});

export const inviteGameInnerDivStyle = css`
  flex: 1;
`;

export const formSectionDivStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  width: calc(100% - 40px);
`;

export const formSectionButtonWrapper = css({
  width: '100%',
  height: '50px',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  borderTop: '1px solid black',

  button: {
    width: '50%',
    height: '100%',
    color: COLORS.WHITE,
  },
});
