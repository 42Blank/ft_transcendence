import { css } from '@emotion/css';
import { COLORS, COMMON_SIZES, FONT_SIZES, makeBorder } from 'styles';

export const changeProfileWrapperStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  fontSize: FONT_SIZES.MEDIUM,

  'input[type="file"]': {
    display: 'none',
  },
});

export const changeAvatarImageStyle = css({
  width: COMMON_SIZES.ICON_XLARGE,
  height: COMMON_SIZES.ICON_XLARGE,
  objectFit: 'cover',
  borderRadius: COMMON_SIZES.ICON_XLARGE,
});

export const changeAvatarImageUploadButtonStyle = css({
  padding: '5px 10px',
  border: makeBorder({ color: COLORS.WHITE }),
  borderRadius: COMMON_SIZES.BORDER_RADIUS_SMALL,
  transition: 'background-color 0.2s ease-in',
  marginLeft: 10,
  marginRight: 20,
  color: COLORS.WHITE,

  ':hover': {
    backgroundColor: COLORS.GRAY3,
    cursor: 'pointer',
  },
});

export const changeProfileLabelStyle = css({
  fontSize: FONT_SIZES.MEDIUM,
  color: COLORS.WHITE,
  width: 80,
  marginRight: 10,
});

export const changeNicknameWrapperStyle = css({
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  input: {
    marginLeft: 10,
    width: 100,
    paddingRight: 30,
    backgroundColor: COLORS.BLACK,
    border: 0,
    borderBottom: makeBorder({ color: COLORS.WHITE }),
    color: COLORS.WHITE,

    ':placeholder': {
      color: COLORS.GRAY3,
    },
  },

  svg: {
    position: 'absolute',
    right: 5,
    fill: COLORS.GREEN,
    width: COMMON_SIZES.ICON_SMALL,
    height: COMMON_SIZES.ICON_SMALL,
  },
});
