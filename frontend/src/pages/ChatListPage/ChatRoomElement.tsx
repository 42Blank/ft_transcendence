import { Link } from 'react-router-dom';

import {
  chatRoomElementStyle,
  chatRoomImageSectionStyle,
  chatRoomLinkStyle,
  chatRoomTextSectionStyle,
} from './ChatRoomElement.styles';

export const ChatRoomElement = () => {
  // TODO: 하드코딩 Data 대신 타입 지정한 실제 더미 데이터 작성
  return (
    <Link to="./123" className={chatRoomLinkStyle}>
      <div className={chatRoomElementStyle}>
        <h3>초보만</h3>
        <div className={chatRoomImageSectionStyle}>
          <img
            src="https://beebom.com/wp-content/uploads/2022/10/Cute-Weakened-form-of-Pochita.jpg?w=640"
            width={50}
            height={50}
            alt="profile1"
          />
          <img
            src="https://pbs.twimg.com/profile_images/1579899155048239127/xbwg77D0_400x400.jpg"
            width={50}
            height={50}
            alt="profile1"
          />
          <img
            width={50}
            height={50}
            src="https://cdn.realsport101.com/images/ncavvykf/epicstream/93aa0b13393fadf785aa93b6ff88c210189853ce-1000x562.jpg?rect=1,0,998,562&w=700&h=394&dpr=2"
            alt="profile1"
          />
        </div>
        <div className={chatRoomTextSectionStyle}>
          <span>jisokang</span>
          <span>외 2명</span>
        </div>
      </div>
    </Link>
  );
};
