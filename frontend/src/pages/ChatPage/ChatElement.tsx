import {
  chatBodyWrapper,
  chatElementWrapper,
  chatMessageWrapper,
  chatProfileWrapper,
  chatTimestampWrapper,
} from './ChatElement.styles';

interface Props {
  nickname: string;
  avatar: string;
  message: string;
  timestamp: string; // TODO: 임시, 변경될 수 있음
  isMine: boolean;
}

export const ChatElement = ({ nickname, avatar, message, timestamp, isMine }: Props) => {
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
        <img src={avatar} alt={`${nickname}-profile`} />
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
