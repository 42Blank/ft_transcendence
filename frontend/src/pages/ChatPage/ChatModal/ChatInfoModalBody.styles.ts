import { css } from '@emotion/css';

export const chatInfoModalBodyStyle = css({
  width: '100%',
  flex: 1,
  overflowX: 'hidden',
  overflowY: 'scroll',
  borderBottom: '1px solid black', // TODO: 상수화
});

export const chatInfoModalBodyButtonWrapperStyle = css({
  width: '100%',
  height: 30,
  display: 'flex',
  flexDirection: 'row',
  borderBottom: '1px solid black', // TODO: 상수화
});

export const chatInfoModalBodyButtonStyle = (isSelected: boolean) =>
  css({
    flex: 1,
    height: '100%',

    span: {
      fontWeight: isSelected ? 700 : 500,
    },

    ':first-child': {
      borderRight: '1px solid black', // TODO: 상수화
    },
  });
