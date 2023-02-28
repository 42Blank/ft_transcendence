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
  marginRight: 20,
  padding: 0,
  border: 'none',

  svg: {
    width: COMMON_SIZES.ICON_MEDIUM,
    height: COMMON_SIZES.ICON_MEDIUM,
    fill: COLORS.WHITE,
  },
});

export const headerIconButtonStyle = css({
  padding: 0,
  border: 'none',
});

export const headerMainButtonStyle = (isSelected: boolean) =>
  css({
    paddingLeft: 20,
    paddingRight: 20,
    border: 'none',

    span: {
      fontWeight: isSelected ? 700 : 400,
    },
  });
