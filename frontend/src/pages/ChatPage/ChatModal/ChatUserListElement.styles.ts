import { css } from '@emotion/css';
import { ChatUserRoleType } from 'types/chat';

export const chatUserElementWrapperStyle = css`
  width: calc(100% - 20px);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const chatUserLinkWrapperStyle = (userRole: ChatUserRoleType) =>
  css({
    flex: 1,
    height: '100%',
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    color: 'black',
    textDecoration: 'none',

    ':hover': {
      cursor: 'pointer',
    },

    svg: {
      position: 'absolute',
      left: 33,
      top: 30,
      width: 20,
      height: 20,
      backgroundColor: userRole === 'host' ? 'magenta' : 'skyblue', // TODO: 상수화
      border: '1px solid white', // TODO: 상수화
      fill: 'white', // TODO: 상수화
      borderRadius: 15,
    },
  });

export const chatUserElementImageStyle = css({
  width: 50,
  height: 50,
  objectFit: 'cover',
  borderRadius: 25,
  marginRight: 10,
  border: '1px solid black',
});

export const chatUserNicknameSpanStyle = css`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 20px;
`;

export const chatUserButtonStyle = css`
  position: relative;
  width: 20px;
  height: 20px;

  & > svg {
    width: 20px;
    height: 20px;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;
