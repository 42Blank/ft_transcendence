import { css } from '@emotion/css';

export const friendsListStyle = (isOpen: boolean) => css`
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid black; // TODO: border color
  transition: margin 0.2s ease-in;

  ${isOpen &&
  `
    margin-left: -300px;
  `}

  & > ul {
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
  }
`;

export const friendsListTitleStyle = css`
  width: 100%;
  text-align: center;
  padding: 10px 0;
  border-bottom: 1px solid black; // TODO: border color
`;
