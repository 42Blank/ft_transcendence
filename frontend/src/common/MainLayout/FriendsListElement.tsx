import { Avatar } from 'common';
import { ROUTE } from 'common/constants';
import { Link } from 'react-router-dom';
import { UserInfoType } from 'types/user';

import { friendsListElementStyle, friendsListImageStyle, friendsListNameStyle } from './FriendsListElement.styles';

interface Props {
  userInfo: UserInfoType;
  isOnline: boolean;
}

export const FriendsListElement = ({ userInfo, isOnline }: Props) => {
  const { id, intraId, nickname, avatar } = userInfo;
  return (
    <li className={friendsListElementStyle(isOnline)}>
      <Link to={`${ROUTE.PROFILE}/${id}`}>
        <Avatar userAvatar={avatar} alt={`${intraId}-profile`} className={friendsListImageStyle} />
        <span className={friendsListNameStyle}>{nickname}</span>
      </Link>
    </li>
  );
};
