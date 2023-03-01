import { css } from '@emotion/css';
import { COLORS, COMMON_SIZES, makeBorder } from 'styles';

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
});

export const formSectionButtonWrapperStyle = css({
  display: 'flex',
  flexDirection: 'row',
  borderTop: makeBorder({}),
});

export const formSectionButtonStyle = css({
  flex: 1,

  '&&': {
    padding: '10px 0',
    border: 0,
    borderRadius: 0,

    ':first-child': {
      borderRight: makeBorder({}),
      borderBottomLeftRadius: COMMON_SIZES.BORDER_RADIUS_SMALL,
    },
    ':last-child': {
      borderBottomRightRadius: COMMON_SIZES.BORDER_RADIUS_SMALL,
    },
  },
});
