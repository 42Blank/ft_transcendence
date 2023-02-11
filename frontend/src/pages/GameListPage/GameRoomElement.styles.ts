import { css } from '@emotion/css';

export const gameRoomLinkStyle = css`
  color: black; // TODO: color 상수화
  text-decoration: none;
  user-select: none;
`;

export const gameRoomElementStyle = css`
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

export const gameRoomVsSectionStyle = css`
  margin-top: 10;
  margin-bottom: 10;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const gameRoomUserWrapperStyle = css`
  width: calc(100% - 30px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  overflow: hidden;

  & > img {
    width: 70px;
    height: 70px;
    border: 2px solid white; // TODO: border color 상수화
    object-fit: cover;
    border-radius: 35px;
  }

  & > span {
    font-size: 15px;
    margin-top: 10px;
  }
`;
