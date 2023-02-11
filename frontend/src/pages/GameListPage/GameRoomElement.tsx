import { Link } from 'react-router-dom';

import {
  gameRoomElementStyle,
  gameRoomVsSectionStyle,
  gameRoomLinkStyle,
  gameRoomUserWrapperStyle,
} from './GameRoomElement.styles';

export const GameRoomElement = () => {
  return (
    <Link to="./123" className={gameRoomLinkStyle}>
      <div className={gameRoomElementStyle}>
        <h3>초보만</h3>
        <div className={gameRoomVsSectionStyle}>
          <div className={gameRoomUserWrapperStyle}>
            <img
              src="https://beebom.com/wp-content/uploads/2022/10/Cute-Weakened-form-of-Pochita.jpg?w=640"
              width={70}
              height={70}
              alt="profile1"
            />
            <span>ycha</span>
          </div>
          <span>vs</span>
          <div className={gameRoomUserWrapperStyle}>
            <img
              src="https://pbs.twimg.com/profile_images/1579899155048239127/xbwg77D0_400x400.jpg"
              width={70}
              height={70}
              alt="profile1"
            />
            <span>jiychoi</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
