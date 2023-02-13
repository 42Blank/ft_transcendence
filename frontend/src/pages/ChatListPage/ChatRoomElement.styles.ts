import { css } from '@emotion/css';

export const chatRoomLinkStyle = css`
  color: black; // TODO: color 상수화
  text-decoration: none;
  user-select: none;
`;

export const chatRoomElementStyle = css`
  display: flex;
  flex-direction: column;
  border: 1px solid black; // TODO: border color 상수화
  border-radius: 5px;
  overflow: hidden;
  height: 180px;

  & > h3 {
    font-weight: 600;
    padding: 15px;
    width: calc(100% - 30px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const chatRoomImageSectionStyle = css`
  margin-top: 10;
  margin-bottom: 10;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & > img {
    width: 50px;
    height: 50px;
    border: 2px solid white; // TODO: border color 상수화
    object-fit: cover;
    border-radius: 25px;

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
  }
`;
