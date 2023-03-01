import { css } from '@emotion/css';
import { COLORS, COMMON_SIZES, FONT_SIZES, makeBorder } from 'styles';

export const chatListPageWrapperStyle = css({
  position: 'relative',
  flex: 1,
  height: 'calc(100vh - 110px)',
  overflowX: 'hidden',
  overflowY: 'scroll',
  padding: 20,
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 20,
});

export const chatRoomIconStyle = css({
  position: 'fixed',
  zIndex: 2,
  right: 30,
  bottom: 30,
  width: COMMON_SIZES.ICON_XLARGE,
  height: COMMON_SIZES.ICON_XLARGE,
  borderRadius: COMMON_SIZES.ICON_XLARGE,
  border: makeBorder({}),
  backgroundColor: COLORS.GRAY3,

  svg: {
    fill: COLORS.WHITE,
  },
});

export const newChatModalWrapperStyle = css({
  '&&': {
    width: 480,
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.BLACK,
    border: makeBorder({}),
  },
});

export const newChatModalHeaderStyle = css({
  fontSize: FONT_SIZES.LARGE,
  width: 'calc(100% - 60px)',
  color: COLORS.WHITE,
  padding: '10px 30px',
  marginBottom: 20,
  borderBottom: makeBorder({}),
});
