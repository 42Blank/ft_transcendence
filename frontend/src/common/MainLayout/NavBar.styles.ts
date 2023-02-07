import { css } from '@emotion/css';

export const headerStyle = css({
  display: 'flex',
  flexDirection: 'row',
  padding: '10px 30px',
  width: 'calc(100% - 60px)',
  height: 50,
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const headerMainButtonStyle = css({
  border: 'none',
  background: 'none',
  padding: 0,
  width: 200,
  height: '100%',

  ' span': {
    // TODO: 나중에 색상, 글자 크기 추가 후 스타일 정의
  },

  ':hover': {
    cursor: 'pointer',
  },
});
