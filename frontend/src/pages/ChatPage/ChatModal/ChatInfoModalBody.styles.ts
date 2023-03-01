import { css } from '@emotion/css';
import { COLORS } from 'styles';

export const chatInfoModalBodyStyle = css({
  width: '100%',
  flex: 1,
  overflowX: 'hidden',
  overflowY: 'scroll',
  backgroundColor: COLORS.GRAY5,
});

export const chatInfoModalBodyButtonWrapperStyle = css({
  width: '100%',
  height: 30,
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: COLORS.GRAY3,
});

export const chatInfoModalBodyButtonStyle = (isSelected: boolean) =>
  css({
    flex: 1,
    height: '100%',

    '&&': {
      padding: 0,
      backgroundColor: isSelected ? COLORS.GRAY5 : COLORS.GRAY3,
    },

    span: {
      fontWeight: isSelected ? 700 : 500,
      opacity: isSelected ? 1 : 0.7,
    },
  });
