import { chatElementWrapper, chatMessageWrapper, chatProfileWrapper, chatTimestampWrapper } from './ChatElement.styles';

interface Props {
  nickname: string;
  avatar: string;
  message: string;
  timestamp: string; // TODO: 임시, 변경될 수 있음
}

export const ChatElement = ({ nickname, avatar, message, timestamp }: Props) => {
  return (
    <li className={chatElementWrapper}>
      <div className={chatProfileWrapper}>
        <img src={avatar} alt={`${nickname}-profile`} />
        <span>{nickname}</span>
      </div>
      <div className={chatMessageWrapper}>
        <span>{message}</span>
      </div>
      <span className={chatTimestampWrapper}>{timestamp}</span>
    </li>
  );
};
