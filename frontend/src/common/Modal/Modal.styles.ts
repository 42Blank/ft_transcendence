import { css } from '@emotion/css';

export const modalBackgroundStyle = css`
  position: fixed;
  left: 0;
  top: 0;
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
  background-color: white; // TODO: 고쳐야됨
  width: 50%;
  height: 50%;
  border: 1px solid black; // TODO: 상수화
  border-radius: 5px;
`;
