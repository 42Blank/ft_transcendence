import { css } from '@emotion/css';

import { FONT_SIZES, COLORS, makeBorder } from 'styles';

export const editProfileModalStyle = css({
  width: 480,
  height: 'fit-content',
  overflow: 'hidden',
  '&&': {
    border: makeBorder({}),
  },
});

export const editProfileFormWrapperStyle = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: COLORS.BLACK,
});

export const editProfileFormTitleStyle = css({
  width: 'calc(100% - 60px)',
  fontSize: FONT_SIZES.LARGE,
  color: COLORS.WHITE,
  padding: '10px 30px',
  marginBottom: 20,
  borderBottom: makeBorder({}),
});

export const changeComponentStyle = css({
  paddingLeft: 30,
  marginBottom: 20,
});

export const sampleAvatarListStyle = css({
  width: 'calc(100% - 60px)',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 10,
  marginBottom: 30,
  padding: '0 30px',
});

export const editButtonWrapperStyle = css({
  display: 'flex',
  flexDirection: 'row',
  borderTop: makeBorder({}),

  button: {
    flex: 1,
    padding: '10px 0',

    ':first-child': {
      borderRight: makeBorder({}),
    },
  },
});
