import { css } from '@emotion/css';

export const friendsListElementStyle = css`
  width: 100%;

  &:not(:last-child) {
    border-bottom: 1px solid black; // TODO: border color
  }

  & > a {
    display: flex;
    width: calc(100% - 20px);
    padding: 5px 10px;
    flex-direction: row;
    align-items: center;
    color: black;
    text-decoration: none;
  }
`;

export const friendsListImageStyle = css`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 25px;
  margin-right: 20px;
`;

export const friendsListNameStyle = css`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
