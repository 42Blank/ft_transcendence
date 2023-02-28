import { css } from '@emotion/css';

import { COLORS, COMMON_SIZES } from 'styles';

export const headerStyle = css({
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: COLORS.BLACK,
  padding: '10px 30px',
  width: 'calc(100% - 60px)',
  height: 49,
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
    border: 0,
  },

  svg: {
    width: COMMON_SIZES.ICON_MEDIUM,
    height: COMMON_SIZES.ICON_MEDIUM,
    fill: COLORS.WHITE,
  },

  ':hover': {
    background: 0,
  },
});

export const headerIconButtonStyle = css({
  '&&': {
    padding: 0,
    marginRight: 30,
    border: 0,
  },

  ':hover': {
    background: 0,
  },
});

export const headerMainButtonStyle = (isSelected: boolean) =>
  css({
    '&&': {
      paddingLeft: 20,
      paddingRight: 20,
      border: 0,
    },

    span: {
      fontWeight: isSelected ? 700 : 400,
    },
  });
