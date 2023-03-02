import { css } from '@emotion/css';
import { COLORS, COMMON_SIZES, FONT_SIZES, makeBorder, makeTransition } from 'styles';
import { ChatUserRoleType } from 'types/chat';

export const chatUserElementWrapperStyle = css({
  width: 'calc(100% - 10px)',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
  paddingLeft: 20,
  paddingRight: 0,
});

export const chatUserLinkWrapperStyle = (userRole: ChatUserRoleType) =>
  css({
    flex: 1,
    height: '100%',
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    textDecoration: 'none',

    ':hover': {
      cursor: 'pointer',
    },

    svg: {
      position: 'absolute',
      left: 33,
      top: 30,
      width: COMMON_SIZES.ICON_SMALL,
      height: COMMON_SIZES.ICON_SMALL,
      backgroundColor: userRole === 'host' ? COLORS.HOST_COLOR : COLORS.OPERATOR_COLOR,
      border: makeBorder({}),
      fill: COLORS.WHITE,
      borderRadius: COMMON_SIZES.ICON_SMALL,
    },
  });

export const chatUserElementImageStyle = css({
  objectFit: 'cover',
  borderRadius: COMMON_SIZES.ICON_XLARGE,
  marginRight: 20,
  border: makeBorder({}),
});

export const chatUserNicknameSpanStyle = css({
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  lineHeight: 1.5,
  color: COLORS.WHITE,
  fontSize: FONT_SIZES.MEDIUM,
  fontWeight: 600,
});

export const chatUserDrawerStyle = (isDrawerOpen: boolean) =>
  css({
    position: 'absolute',
    zIndex: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: 'fit-content',
    height: 'calc(100% - 16px)',
    top: 16,
    right: isDrawerOpen ? 0 : -120,
    transition: makeTransition({ attrs: 'right' }),
  });

export const chatUserDrawerInnerStyle = css({
  backgroundColor: COLORS.GRAYA,
  width: 100,
  height: 'calc(100% - 20px)',
  display: 'flex',
  flexDirection: 'column',
  padding: 10,
  overflowX: 'hidden',
  overflowY: 'scroll',
});

export const chatUserButtonStyle = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  borderBottom: makeBorder({ color: COLORS.GRAY5 }),

  '&&': {
    padding: '5px 0',
    ':hover': {
      backgroundColor: COLORS.GRAY9,
    },
  },

  ':not(:last-child)': {
    marginRight: 10,
  },

  svg: {
    width: COMMON_SIZES.ICON_MEDIUM,
    height: COMMON_SIZES.ICON_MEDIUM,
    marginRight: 10,
  },

  span: {
    color: COLORS.BLACK,
    fontSize: FONT_SIZES.SMALL,
  },
});

export const chatUserDrawerButtonStyle = (isDrawerOpen: boolean) =>
  css({
    width: COMMON_SIZES.ICON_LARGE,
    height: COMMON_SIZES.ICON_LARGE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: isDrawerOpen ? 120 : 0,
    transition: makeTransition({ attrs: 'margin-right' }),

    '&&': {
      backgroundColor: COLORS.GRAYA,
      borderTopLeftRadius: COMMON_SIZES.BORDER_RADIUS_SMALL,
      borderBottomLeftRadius: COMMON_SIZES.BORDER_RADIUS_SMALL,

      ':hover': {
        backgroundColor: COLORS.GRAYA,
      },
    },

    svg: {
      transform: isDrawerOpen ? 'rotate(0.75turn)' : 'rotate(0.25turn)',
      width: COMMON_SIZES.ICON_MEDIUM,
      height: COMMON_SIZES.ICON_MEDIUM,
      fill: COLORS.GRAY3,
    },
  });
