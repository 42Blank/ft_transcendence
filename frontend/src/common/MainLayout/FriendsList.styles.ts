import { css } from '@emotion/css';

export const friendsListStyle = (isOpen: boolean) => css`
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid black; // TODO: border color
  transition: margin 0.2s ease-in;

  ${!isOpen &&
  `
    margin-left: -251px;
  `}

  & > ul {
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
  }
`;

export const friendsListTabWrapperStyle = css({
  width: '100%',
  textAlign: 'center',
  borderBottom: '1px solid black', // TODO: 상수화
});

export const friendsListTabButtonStyle = (isCurrentTab: boolean) =>
  css({
    width: '50%',
    padding: '10px 0', // TODO: 상수화
    span: {
      fontWeight: isCurrentTab ? 700 : 400,
    },
    ':first-child': {
      borderRight: '1px solid black', // TODO: 상수화
    },
  });
