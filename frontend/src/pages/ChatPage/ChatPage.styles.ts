import { css } from '@emotion/css';

export const chatPageWrapperStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: calc(100vh - 70px);
`;

export const chatPageTitleStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white; // TODO: 상수화
  padding: 20px;
  border-bottom: 1px solid black; // TODO: 상수화

  & > span {
    font-size: 20px; // TODO: 상수화
  }
`;

export const chatPageMenuButtonStyle = css`
  width: 20px;
  height: 20px;

  & > svg {
    width: 20px;
    height: 20px;
  }
`;

export const chatPageListWrapperStyle = css`
  flex: 1;
  overflow-x: hidden;
  overflow-y: scroll;
`;

export const closeButtonStyle = css`
  border: 1px solid black; // TODO: 색상 상수화
`;
