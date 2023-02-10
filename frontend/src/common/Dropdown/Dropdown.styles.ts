import { css } from '@emotion/css';

export const dropdownWrapperStyle = css`
  position: relative;
  background-color: white; // TODO: 색상 상수화
  width: fit-content;
  display: flex;
  flex-direction: column;
`;

export const dropdownTopValueStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid black; // TODO: 색상 상수화
  padding: 3px 5px;
`;

export const dropdownToggleIconStyle = (isShown: boolean) => css`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    ${isShown && 'transform: rotate(0.5turn);'}
    width: 20px;
    height: 20px;
    // TODO: fill color
  }
`;

export const dropdownListStyle = (isShown: boolean) => css`
  z-index: 2; // TODO: 색상 상수화
  background-color: white; // TODO: 색상 상수화
  display: ${isShown ? 'flex' : 'none'};
  position: absolute;
  left: 0;
  top: 27px;
  border: 1px solid black; // TODO: 색상 상수화
  flex-direction: column;
  width: calc(100% - 2px);
`;

export const dropdownListElementStyle = css`
  & button {
    padding: 3px 5px;
    width: 100%;
    text-align: left;
  }

  &:hover {
    background-color: lightgray; // TODO: 색상 상수화
  }

  &:not(:last-child) {
    border-bottom: 1px solid black; // TODO: 색상 상수화
  }
`;
