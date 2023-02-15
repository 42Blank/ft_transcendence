import { css } from '@emotion/css';

export const chatUserElementWrapperStyle = css`
  width: calc(100% - 20px);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const chatUserLinkWrapperStyle = css`
  flex: 1;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  color: black; // TODO: 상수화
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }

  & > svg {
    position: absolute;
    left: 30px;
    top: 28px;
    width: 20px;
    height: 20px;
    background-color: black; // TODO: 상수화
    border: 1px solid black; // TODO: 상수화
    fill: white; // TODO: 상수화
    border-radius: 20px;
  }
`;

export const chatUserElementImageStyle = css`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 25px;
  margin-right: 10px;
`;

export const chatUserNicknameSpanStyle = css`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 20px;
`;

export const chatUserButtonStyle = css`
  position: relative;
  width: 30px;
  height: 30px;

  & > svg {
    width: 30px;
    height: 30px;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;
