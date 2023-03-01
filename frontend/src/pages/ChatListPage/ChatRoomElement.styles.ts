import { css } from '@emotion/css';
import { COLORS, COMMON_SIZES, makeBorder } from 'styles';

export const chatRoomElementStyle = css({
  width: 300,
  height: 200,
  backgroundColor: COLORS.BLACK_TRANSPARENTC,
  position: 'relative',
  userSelect: 'none',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: COMMON_SIZES.BORDER_RADIUS_SMALL,
  overflow: 'hidden',

  svg: {
    position: 'absolute',
    left: 10,
    top: 10,
    fill: COLORS.WHITE,
    width: COMMON_SIZES.ICON_SMALL,
    height: COMMON_SIZES.ICON_SMALL,
  },
  h3: {
    color: COLORS.WHITE,
    fontWeight: 600,
    padding: 15,
    width: 'calc(100% - 30px)',
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

export const chatRoomFormSectionStyle = css({
  margin: '10px 0 0',
  width: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const chatRoomFormButtonSectionStyle = css({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: 40,
  alignItems: 'center',
  borderTop: makeBorder({}),

  button: {
    flex: 1,
    height: '100%',
    border: 0,
    background: 0,
    borderRadius: 0,

    ':first-child': {
      borderRight: makeBorder({}),
    },
  },
});

export const chatRoomImageSectionStyle = css({
  margin: '10px 0',
  width: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',

  img: {
    width: COMMON_SIZES.ICON_XLARGE,
    height: COMMON_SIZES.ICON_XLARGE,
    borderRadius: COMMON_SIZES.ICON_XLARGE,
    objectFit: 'cover',
    border: makeBorder({ width: 2 }),

    ':not(:last-child)': {
      marginRight: -15,
    },
  },
});

export const chatRoomTextSectionStyle = css({
  width: 'calc(100% - 30px)',
  display: 'flex',
  flexDirection: 'row',
  padding: 15,
  overflow: 'hidden',

  span: {
    color: COLORS.WHITE,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    lineHeight: 1.5,
  },

  'span:last-child': {
    marginLeft: 5,
    opacity: 0.5,
    width: '30%',
    textAlign: 'center',
  },
});
