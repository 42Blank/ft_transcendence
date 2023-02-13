import { css } from '@emotion/css';

export const chatRoomElementStyle = css`
  position: relative;
  user-select: none;
  display: flex;
  flex-direction: column;
  border: 1px solid black; // TODO: border color 상수화
  border-radius: 5px;
  overflow: hidden;

  & > svg {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
  }

  & > h3 {
    font-weight: 600;
    padding: 15px;
    width: calc(100% - 30px);
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const chatRoomFormSectionStyle = css`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > input {
    border: 1px solid black; // TODO: 상수화
    border-radius: 5px;
    padding: 2px 10px;
    font-size: 15.5px;
  }
`;

export const chatRoomFormButtonSectionStyle = css`
  display: flex;
  flex-direction: row;
  width: calc(100% - 40px);
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 10px;

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 30px;
    border: 1px solid black; // TODO: 상수화
    border-radius: 5px;
  }
`;

export const chatRoomImageSectionStyle = css`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & > img {
    width: 56px;
    height: 56px;
    border: 2px solid white; // TODO: border color 상수화
    object-fit: cover;
    border-radius: 40px;

    &:not(:last-child) {
      margin-right: -15px;
    }
  }
`;

export const chatRoomTextSectionStyle = css`
  width: calc(100% - 30px);
  display: flex;
  flex-direction: row;
  padding: 15px;
  overflow: hidden;

  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 18px;
  }

  & > span:last-child {
    margin-left: 5px;
    opacity: 0.5;
    width: 30%;
    text-align: center;
  }
`;
