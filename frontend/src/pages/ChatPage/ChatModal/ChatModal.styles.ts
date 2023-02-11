import { css } from '@emotion/css';

export const chatModalHeaderStyle = css`
  width: calc(100% - 40px);
  padding: 10px 20px;
  border-bottom: 1px solid black; // TODO: 색상 상수화
`;

export const chatModalTitleWrapperStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;

  & h4 {
    font-size: 18px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & button {
    width: 25px;
    height: 25px;
    margin-left: 10px;

    & > svg {
      width: 25px;
      height: 25px;
    }
  }
`;

export const chatVisibilityWrapperStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const chatVisibilityLeftSpanStyle = css`
  margin-right: 5px;
`;

export const chatVisibilityRightSpanStyle = css`
  margin-left: 5px;
`;

export const chatPasswordWrapperStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;

  & input {
    margin: 0px 5px;
  }

  & button {
    border: 1px solid black; // TODO: 상수화
    border-radius: 3px;
    padding: 2px 5px;
    font-size: 13px;
  }
`;

export const chatInfoModalBodyStyle = css`
  width: 100%;
  height: 65%;
  overflow-x: hidden;
  overflow-y: scroll;
  border-bottom: 1px solid black; // TODO: 상수화
`;

export const chatUserElementWrapperStyle = css`
  width: calc(100% - 20px);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
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
