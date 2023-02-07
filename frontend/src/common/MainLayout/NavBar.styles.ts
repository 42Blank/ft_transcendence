import { css } from '@emotion/css';

export const headerStyle = css({
  display: 'flex',
  flexDirection: 'row',
  padding: '10px 30px',
  width: 'calc(100% - 60px)',
  height: 50,
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid black', // TODO: border color
});

export const headerLeftSectionStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '100%',
});

export const headerIconButtonStyle = css({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  alignItems: 'center',

  img: {
    height: 40,
    marginRight: 15,
  },
  h1: {
    // TODO: 폰트 크기 및 색상 지정
    marginRight: 15,
  },
});

export const headerMainButtonStyle = (isSelected: boolean) =>
  css({
    padding: `0 20px`,
    height: '100%',
    fontWeight: isSelected ? 700 : 400,

    ' span': {
      // TODO: 나중에 색상, 글자 크기 추가 후 스타일 정의
    },

    ':hover': {
      backgroundColor: 'lightgray', // TODO: 나중에 색상 변경
    },
  });
