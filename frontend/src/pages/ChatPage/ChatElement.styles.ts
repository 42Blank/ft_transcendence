import { css } from '@emotion/css';

export const chatElementWrapper = (isMine: boolean) =>
  css`
    padding: 10px;
    overflow: hidden;
    width: calc(100% - 20px);
    display: flex;
    flex-direction: row;
    justify-content: ${isMine ? 'flex-end' : 'flex-start'};
    align-items: flex-start;
  `;

export const chatProfileWrapper = css`
  position: relative;
  width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;

  & > img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border: 1px solid black; // TODO: 상수화
    border-radius: 30px;
  }

  & > svg {
    position: absolute;
    right: 5px;
    top: 33px;
    width: 20px;
    height: 20px;
    background-color: black; // TODO: 상수화
    border: 1px solid black; // TODO: 상수화
    fill: white; // TODO: 상수화
    border-radius: 20px;
  }

  & > span {
    margin-top: 3px;
    width: 70px;
    line-height: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }
`;

export const chatBodyWrapper = css`
  max-width: calc(100% - 90px);
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

export const chatTimestampWrapper = (isMine: boolean) =>
  css`
    text-align: ${isMine ? 'end' : 'start'};
    margin: ${isMine ? '0 10px 0 0' : '0 0 0 10px'};
    width: 80px;
    margin-bottom: 5px;
    font-size: 10px; // TODO: 상수화
    opacity: 0.5;
  `;

export const chatMessageWrapper = css`
  border: 1px solid black; // TODO: 상수화
  border-radius: 5px;
  padding: 10px;
  height: fit-content;
  flex: 1;
  margin-top: 10px;

  & > span: {
    // TODO: style
  },
`;
