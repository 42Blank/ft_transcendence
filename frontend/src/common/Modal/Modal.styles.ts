import { css } from '@emotion/css';

export const modalBackgroundStyle = css`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 5;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(5px);
  background-color: #00000010; // TODO: 상수화
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const modalInnerStyle = css`
  z-index: 10;
  background-color: white;
  width: 50%;
  height: 50%;
  border: 1px solid black; // TODO: 상수화
  border-radius: 5px;
`;
