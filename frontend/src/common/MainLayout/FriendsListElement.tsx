import { ROUTE } from 'common/constants';
import { Link } from 'react-router-dom';
import { UserInfoType } from 'types/user';

import { friendsListElementStyle, friendsListImageStyle, friendsListNameStyle } from './FriendsListElement.styles';

interface Props {
  userInfo: UserInfoType;
}

export const FriendsListElement = ({ userInfo }: Props) => {
  const { id, intraId, nickname, avatar } = userInfo;
  return (
    <li className={friendsListElementStyle}>
      <Link to={`${ROUTE.PROFILE}/${id}`}>
        <img src={avatar} alt={`${intraId}-profile`} className={friendsListImageStyle} />
        <span className={friendsListNameStyle}>{nickname}</span>
      </Link>
    </li>
  );
};
