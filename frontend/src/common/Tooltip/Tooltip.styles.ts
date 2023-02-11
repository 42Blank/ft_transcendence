import { css } from '@emotion/css';

export const tooltipWrapper = css`
  z-index: 4;
  position: absolute;
  bottom: 50%;
  right: -50%;
  padding: 5px 10px;
  background-color: white; // TODO: 상수화
  border: 1px solid black; // TODO: 상수화
  border-radius: 3px;
  white-space: nowrap;
`;
