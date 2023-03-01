import { css } from '@emotion/css';

export const chatInputStyle = css({
  height: 60,
  padding: '0 20px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'white', // TODO: 상수화
  borderTop: '1px solid black', // TODO: 상수화

  input: {
    flex: 1,
  },

  button: {
    width: 40,
    height: 40,
    marginLeft: 20,
    borderRadius: 5,
    border: '1px solid black', // TODO: 상수화
  },
});
