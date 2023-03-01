import { css } from '@emotion/css';
import { COLORS, makeBorder } from 'styles';

export const newChatFormStyle = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

export const newChatInnerDivStyle = css({
  flex: 1,
});

export const formSectionDivStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '0 30px',
  marginBottom: 20,
  width: 'calc(100% - 60px)',

  label: {
    width: 80,
    color: COLORS.WHITE,
    marginRight: 10,
  },

  input: {
    width: 200,
    backgroundColor: COLORS.BLACK,
    border: 0,
    borderBottom: makeBorder({}),
    color: COLORS.WHITE,

    ':placeholder': {
      color: COLORS.GRAY3,
    },
  },
});

export const formSectionButtonWrapper = css({
  display: 'flex',
  flexDirection: 'row',
  borderTop: makeBorder({}),

  button: {
    flex: 1,
    padding: '10px 0',
    border: 0,
    borderRadius: 0,

    ':first-child': {
      borderRight: makeBorder({}),
    },

    span: {
      color: COLORS.WHITE,
    },
  },
});
