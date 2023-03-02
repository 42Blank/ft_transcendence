import { css } from '@emotion/css';

import { COLORS, COMMON_SIZES } from 'styles';

export const headerStyle = css({
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: COLORS.BLACK,
  padding: '0 30px',
  width: 'calc(100% - 60px)',
  height: 70,
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const headerLeftSectionStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '100%',
});

export const headerHamburgerButtonStyle = css({
  '&&': {
    padding: 0,
    marginRight: 20,
  },

  svg: {
    width: COMMON_SIZES.ICON_MEDIUM,
    height: COMMON_SIZES.ICON_MEDIUM,
    fill: COLORS.WHITE,
    ':hover': {
      background: COLORS.TRANSPARENT,
    },
  },
});

export const headerIconButtonStyle = css({
  '&&': {
    padding: 0,
    marginRight: 30,
    ':hover': {
      background: COLORS.TRANSPARENT,
    },
  },
});

export const headerMainButtonStyle = (isSelected: boolean) =>
  css({
    height: '100%',
    '&&': {
      paddingLeft: 20,
      paddingRight: 20,
    },

    span: {
      fontWeight: isSelected ? 700 : 400,
      opacity: isSelected ? 1 : 0.7,
    },
  });
