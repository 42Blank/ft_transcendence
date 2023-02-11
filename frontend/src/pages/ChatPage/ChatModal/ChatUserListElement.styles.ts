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
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  color: black; // TODO: 상수화
  text-decoration: none;

  &:hover {
    cursor: pointer;
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
