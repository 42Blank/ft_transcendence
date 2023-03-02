import { css } from '@emotion/css';
import { COLORS, FONT_SIZES, makeBorder } from 'styles';

export const newGameModalStyle = css({
  width: 480,
  height: 'fit-content',
  overflow: 'hidden',
  '&&': {
    border: makeBorder({}),
  },
});

export const newGameFormWrapperStyle = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: COLORS.BLACK,
});

export const newGameFormTitleStyle = css({
  width: 'calc(100% - 60px)',
  fontSize: FONT_SIZES.LARGE,
  color: COLORS.WHITE,
  padding: '10px 30px',
  marginBottom: 20,
  borderBottom: makeBorder({}),
});

export const newGameModalWrapperStyle = css({
  '&&': {
    width: 480,
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.BLACK,
    border: makeBorder({}),
  },
});

export const newGameModalHeaderStyle = css({
  fontSize: FONT_SIZES.LARGE,
  width: 'calc(100% - 60px)',
  color: COLORS.WHITE,
  padding: '10px 30px',
  marginBottom: 20,
  borderBottom: makeBorder({}),
});

export const newGameFormStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const newGameInnerDivStyle = css`
  flex: 1;
`;

export const formSectionDivStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '0 30px',
  marginBottom: 20,
  width: 'calc(100% - 60px)',

  label: {
    width: 80,
    color: COLORS.WHITE,
    marginRight: 10,
  },
});

export const formSectionButtonWrapper = css`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid black; // TODO: 색상 상수화

  & button {
    width: 50%;
    height: 100%;
  }

  & button:first-child {
    border-right: 1px solid black; // TODO: 색상 상수화
  }
`;
