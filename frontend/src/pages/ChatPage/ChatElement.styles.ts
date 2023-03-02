import { css } from '@emotion/css';
import { COLORS, COMMON_SIZES, FONT_SIZES, makeBorder } from 'styles';

export const chatElementWrapper = (isMine: boolean) =>
  css({
    padding: 10,
    width: 'calc(100% - 20px)',
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: isMine ? 'flex-end' : 'flex-start',
    alignItems: 'center',
  });

export const chatProfileWrapper = css({
  position: 'relative',
  width: 70,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginRight: 20,
  color: COLORS.BLACK,
  textDecoration: 'none',

  svg: {
    position: 'absolute',
    right: 5,
    top: 33,
    width: COMMON_SIZES.ICON_SMALL,
    height: COMMON_SIZES.ICON_SMALL,
    borderRadius: COMMON_SIZES.ICON_SMALL,
    fill: COLORS.WHITE,
  },

  span: {
    marginTop: 3,
    width: 70,
    lineHeight: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    color: COLORS.WHITE_TRANSPARENTC,
  },
});

export const chatBodyWrapper = css({
  maxWidth: 'calc(100% - 90px)',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
});

export const chatTimestampWrapper = (isMine: boolean) =>
  css({
    textAlign: isMine ? 'end' : 'start',
    margin: isMine ? '0 10px 0 0' : '0 0 0 10px',
    width: 80,
    marginBottom: 5,
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.XSMALL,
    opacity: 0.5,
  });

export const chatMessageWrapper = css({
  backgroundColor: COLORS.BLACK_TRANSPARENT9,
  border: makeBorder({}),
  borderRadius: 5,
  padding: 10,
  height: 'fit-content',
  flex: 1,
  overflow: 'hidden',

  p: {
    color: COLORS.WHITE,
    wordBreak: 'break-all',
  },
});
