import { UserInfoType } from 'types/user';

import { friendsListElementStyle, friendsListImageStyle, friendsListNameStyle } from './FriendsListElement.styles';

interface Props {
  userInfo: UserInfoType;
}

export const FriendsListElement = ({ userInfo }: Props) => {
  const { intraId, nickname, avatar: imageSrc } = userInfo;
  return (
    <li className={friendsListElementStyle}>
      <img src={imageSrc} alt={`${intraId}-profile`} className={friendsListImageStyle} />
      <span className={friendsListNameStyle}>{nickname}</span>
    </li>
  );
};
