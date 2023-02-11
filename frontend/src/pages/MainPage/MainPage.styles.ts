import { css } from '@emotion/css';

export const MainPageWrapperStyle = css`
  position: relative;
  flex: 1;
  height: calc(100vh - 110px);
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 180px);
  gap: 20px;
`;

export const chatRoomIconStyle = css`
  position: absolute;
  z-index: 2;
  right: 30px;
  bottom: 30px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: white; // TODO: 상수화
  border: 1px solid black; // TODO: 상수화

  & > svg {
    fill: black; // TODO: 상수화
  }
`;

export const newChatModalWrapperStyle = css`
  height: 30%;
  display: flex;
  flex-direction: column;
`;

export const newChatModalHeaderStyle = css`
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
