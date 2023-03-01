import { css } from '@emotion/css';

import { COLORS, FONT_SIZES } from 'styles';

export const profileHeaderWrapperStyle = css({
  backgroundColor: COLORS.BLACK_TRANSPARENT9,
  width: 'calc(100% - 60px)',
  padding: '20px 30px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const profileHeaderAvatarStyle = css({
  marginRight: 30,
});

export const profileNicknameSectionStyle = css({
  flex: 1,
  userSelect: 'none',

  h2: {
    fontSize: FONT_SIZES.XLARGE,
    color: COLORS.WHITE,
    marginBottom: 10,
  },

  span: {
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.WHITE,
    opacity: 0.7,
  },
});

export const profileButtonSectionStyle = css({
  width: 200,
  display: 'flex',
  flexDirection: 'column',
});

export const profileButtonStyle = css({
  '&&': {
    flex: 1,
    padding: '10px 0',
    border: 0,
    background: 0,
    userSelect: 'none',
  },

  ':hover': {
    background: COLORS.WHITE_TRANSPARENT3,
  },
});

export const profileButtonSectionBottomStyle = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
});
