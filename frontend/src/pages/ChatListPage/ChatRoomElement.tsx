import { Link } from 'react-router-dom';

import { ChatRoomInfoType } from 'types/chat';

import {
  chatRoomElementStyle,
  chatRoomImageSectionStyle,
  chatRoomLinkStyle,
  chatRoomTextSectionStyle,
} from './ChatRoomElement.styles';

interface Props {
  chatRoomInfo: ChatRoomInfoType;
}

export const ChatRoomElement = ({ chatRoomInfo }: Props) => {
  const { roomTitle, id: roomID, users } = chatRoomInfo;

  return (
    <Link to={`./${roomID}`} className={chatRoomLinkStyle} state={chatRoomInfo}>
      <div className={chatRoomElementStyle}>
        <h3>{roomTitle}</h3>
        <div className={chatRoomImageSectionStyle}>
          {users.map(({ user }, index) => (
            <img key={`${roomID}-${index}`} src={user.avatar} width={50} height={50} alt={`${index}-profile`} />
          ))}
        </div>
        <div className={chatRoomTextSectionStyle}>
          <span>{users[0].user.nickname}</span>
          <span>{`외 ${users.length - 1}명`}</span>
        </div>
      </div>
    </Link>
  );
};
