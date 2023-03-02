import { css } from '@emotion/css';
import { COLORS, COMMON_SIZES, FONT_SIZES, makeBorder } from 'styles';

export const chatListPageWrapperStyle = css({
  position: 'relative',
  flex: 1,
  height: 'calc(100vh - 110px)',
  overflow: 'hidden',
  padding: 20,
});

export const chatListPageInnerStyle = css({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 20,
  height: 'fit-content',
  maxHeight: '100%',
  overflowY: 'scroll',
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
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
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
