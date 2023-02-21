import { ROUTE } from 'common/constants';
import { Link } from 'react-router-dom';
import { UserInfoType } from 'types/user';

import { friendsListElementStyle, friendsListImageStyle, friendsListNameStyle } from './FriendsListElement.styles';

interface Props {
  userInfo: UserInfoType;
}

export const FriendsListElement = ({ userInfo }: Props) => {
  const { id, intraId, nickname, avatar, isOnline } = userInfo;
  return (
    <li className={friendsListElementStyle(isOnline)}>
      <Link to={`${ROUTE.PROFILE}/${id}`}>
        <img src={avatar} alt={`${intraId}-profile`} width={50} height={50} className={friendsListImageStyle} />
        <span className={friendsListNameStyle}>{nickname}</span>
      </Link>
    </li>
  );
};
