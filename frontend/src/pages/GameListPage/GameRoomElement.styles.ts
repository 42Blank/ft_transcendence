import { css } from '@emotion/css';
import { COLORS, COMMON_SIZES, makeBorder } from 'styles';

export const gameRoomElementStyle = css({
  width: 300,
  height: 200,
  backgroundColor: COLORS.BLACK_TRANSPARENTC,
  position: 'relative',
  userSelect: 'none',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: COMMON_SIZES.BORDER_RADIUS_SMALL,
  overflow: 'hidden',

  h3: {
    color: COLORS.WHITE,
    fontWeight: 500,
    paddingTop: 10,
    paddingBottom: 5,
    width: '100%',
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

export const gameRoomFormSectionStyle = css({
  width: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const gameRoomFormButtonSectionStyle = css({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: 40,
  alignItems: 'center',
  borderTop: makeBorder({}),

  button: {
    flex: 1,
    height: '100%',

    ':first-child': {
      borderRight: makeBorder({}),
    },
  },
});

export const gameRoomAvatarSectionStyle = css({
  position: 'relative',
  overflow: 'hidden',
  border: makeBorder({}),
  width: COMMON_SIZES.ICON_XLARGE,
  height: COMMON_SIZES.ICON_XLARGE,
  borderRadius: COMMON_SIZES.ICON_XLARGE,
});

export const gameRoomTextSectionStyle = css({
  paddingTop: 10,
  color: COLORS.WHITE,
});

export const gameRoomLinkStyle = css`
  color: black; // TODO: color 상수화
  text-decoration: none;
  user-select: none;
`;

export const gameRoomVsSectionStyle = css({
  width: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingBottom: '10px',
});

export const gameRoomVsSpanStyle = css({
  color: COLORS.WHITE,
});

export const gameRoomUserWrapperStyle = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});
