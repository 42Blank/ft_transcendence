import { css } from '@emotion/css';
import { COLORS, COMMON_SIZES, makeBorder } from 'styles';

export const gameListWrapperStyle = css`
  position: relative;
  flex: 1;
  height: calc(100vh - 110px);
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(2, 300px);
  grid-template-rows: repeat(3, 180px);
  gap: 20px;
`;

export const gameRoomIconStyle = css({
  position: 'fixed',
  zIndex: 2,
  right: 30,
  bottom: 30,
  width: COMMON_SIZES.ICON_XLARGE,
  height: COMMON_SIZES.ICON_XLARGE,
  borderRadius: COMMON_SIZES.ICON_XLARGE,
  border: makeBorder({}),
  backgroundColor: COLORS.GRAY3,

  svg: {
    fill: COLORS.WHITE,
  },
});

export const gameMatchIconStyle = css({
  position: 'fixed',
  zIndex: 2,
  right: 100,
  bottom: 30,
  width: COMMON_SIZES.ICON_XLARGE,
  height: COMMON_SIZES.ICON_XLARGE,
  borderRadius: COMMON_SIZES.ICON_XLARGE,
  border: makeBorder({}),
  backgroundColor: COLORS.GRAY3,

  svg: {
    paddingTop: 3,
    fill: COLORS.WHITE,
    width: 32,
    height: 32,
  },
});

export const newGameModalWrapperStyle = css`
  height: 30%;
  display: flex;
  flex-direction: column;
`;

export const newGameModalHeaderStyle = css`
  width: calc(100% - 40px);
  padding: 10px 20px;
  border-bottom: 1px solid black; // TODO: 색상 상수화

  & > h4 {
    font-size: 18px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
