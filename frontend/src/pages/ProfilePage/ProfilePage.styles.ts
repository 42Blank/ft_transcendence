import { css } from '@emotion/css';
import { COLORS } from 'styles';

export const profileContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  height: 'calc(100vh - 70px)',
  overflow: 'hidden',
  background: COLORS.BLACK_TRANSPARENT6,
});

export const profileTabWrapperStyle = css({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
});

export const profileTabStyle = (isSelected: boolean) =>
  css({
    '&&': {
      backgroundColor: isSelected ? COLORS.BLACK_TRANSPARENT3 : COLORS.BLACK_TRANSPARENT9,
      border: 0,
      padding: '10px 40px',
      borderRadius: 0,
    },

    span: {
      fontWeight: isSelected ? 700 : 500,
      opacity: isSelected ? 1 : 0.7,
    },
  });

export const profileTabBlankStyle = css({
  flex: 1,
  background: COLORS.BLACK_TRANSPARENT9,
});
