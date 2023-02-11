import { ChatUserInfoType } from 'types/chat';
import {
  chatBodyWrapper,
  chatElementWrapper,
  chatMessageWrapper,
  chatProfileWrapper,
  chatTimestampWrapper,
} from './ChatElement.styles';

interface Props {
  chatUser: ChatUserInfoType;
  message: string;
  timestamp: string; // TODO: 임시, 변경될 수 있음
  isMine: boolean;
}

export const ChatElement = ({ chatUser, message, timestamp, isMine }: Props) => {
  const { nickname, avatar } = chatUser.user;

  if (isMine)
    return (
      <li className={chatElementWrapper(true)}>
        <div className={chatBodyWrapper}>
          <span className={chatTimestampWrapper(true)}>{new Date(timestamp).toLocaleTimeString()}</span>
          <div className={chatMessageWrapper}>
            <span>{message}</span>
          </div>
        </div>
      </li>
    );
  return (
    <li className={chatElementWrapper(false)}>
      <div className={chatProfileWrapper}>
        <img src={avatar} alt={`${nickname}-profile`} width={50} height={50} />
        <span>{nickname}</span>
      </div>
      <div className={chatBodyWrapper}>
        <div className={chatMessageWrapper}>
          <span>{message}</span>
        </div>
        <span className={chatTimestampWrapper(false)}>{new Date(timestamp).toLocaleTimeString()}</span>
      </div>
    </li>
  );
};
