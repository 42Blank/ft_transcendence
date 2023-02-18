import { css } from '@emotion/css';

export const newGameFormStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const newGameInnerDivStyle = css`
  flex: 1;
`;

export const formSectionDivStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  width: calc(100% - 40px);
`;

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
