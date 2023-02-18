import { Link } from 'react-router-dom';

import { CrownIcon } from 'assets';
import { ROUTE } from 'common/constants';
import { ChatUserInfoType } from 'types/chat';

import {
  chatBodyWrapper,
  chatElementWrapper,
  chatMessageWrapper,
  chatProfileWrapper,
  chatTimestampWrapper,
} from './ChatElement.styles';

interface Props {
  chatUser: Pick<ChatUserInfoType, 'user' | 'role'>;
  message: string;
  timestamp: string; // TODO: 임시, 변경될 수 있음
  isMine: boolean;
}

export const ChatElement = ({ chatUser, message, timestamp, isMine }: Props) => {
  const { nickname, avatar, id } = chatUser.user;

  if (isMine)
    return (
      <li className={chatElementWrapper(true)}>
        <div className={chatBodyWrapper}>
          <span className={chatTimestampWrapper(true)}>{new Date(timestamp).toLocaleTimeString()}</span>
          <div className={chatMessageWrapper}>
            <p>{message}</p>
          </div>
        </div>
      </li>
    );

  return (
    <li className={chatElementWrapper(false)}>
      <Link to={`${ROUTE.PROFILE}/${id}`} className={chatProfileWrapper}>
        <img src={avatar} alt={`${nickname}-profile`} width={50} height={50} />
        <span>{nickname}</span>
        {(chatUser.role === 'operator' || chatUser.role === 'host') && <CrownIcon />}
      </Link>
      <div className={chatBodyWrapper}>
        <div className={chatMessageWrapper}>
          <p>{message}</p>
        </div>
        <span className={chatTimestampWrapper(false)}>{new Date(timestamp).toLocaleTimeString()}</span>
      </div>
    </li>
  );
};
