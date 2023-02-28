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

export const cardStyle = css({
  gridArea: 'card',
  borderBottom: '1px solid black',
});

export const histStyle = css({
  gridArea: 'hist',
  borderRight: '1px solid black',
});

export const achvStyle = css({
  gridArea: 'achv',
});
