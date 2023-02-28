import { Avatar } from 'common';
import { ROUTE } from 'common/constants';
import { Link } from 'react-router-dom';
import { UserInfoType, UserStateType } from 'types/user';

import { friendsListElementStyle, friendsListImageStyle, friendsListNameStyle } from './FriendsListElement.styles';

interface Props {
  userInfo: UserInfoType;
  state: UserStateType;
}

export const FriendsListElement = ({ userInfo, state }: Props) => {
  const { id, intraId, nickname, avatar } = userInfo;
  return (
    <li className={friendsListElementStyle(state)}>
      <Link to={`${ROUTE.PROFILE}/${id}`}>
        <Avatar userAvatar={avatar} alt={`${intraId}-profile`} className={friendsListImageStyle} />
        <span className={friendsListNameStyle}>{nickname}</span>
      </Link>
    </li>
  );
};
