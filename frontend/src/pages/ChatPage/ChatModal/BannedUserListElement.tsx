import { useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';

import { UnbanIcon } from 'assets';
import { ROUTE } from 'common/constants';
import { userOperationState } from 'store';
import { ChatUserRoleType } from 'types/chat';
import { UserInfoType } from 'types/user';

import {
  chatUserButtonStyle,
  chatUserElementImageStyle,
  chatUserElementWrapperStyle,
  chatUserLinkWrapperStyle,
  chatUserNicknameSpanStyle,
} from './ChatUserListElement.styles';

interface Props {
  user: UserInfoType;
  currentUserRole: ChatUserRoleType;
}

export const BannedUserListElement = ({ user, currentUserRole }: Props) => {
  const setOperation = useSetRecoilState(userOperationState);

  function handleClickUnbanIcon() {
    setOperation({ userId: user.id, operation: 'unban' });
  }

  return (
    <li className={chatUserElementWrapperStyle}>
      <Link to={`${ROUTE.PROFILE}/${user.id}`} className={chatUserLinkWrapperStyle('user')}>
        <img
          src={user.avatar}
          alt={`${user.nickname}-avatar`}
          width={50}
          height={50}
          className={chatUserElementImageStyle}
        />
        <span className={chatUserNicknameSpanStyle}>{user.nickname}</span>
      </Link>
      {currentUserRole !== 'user' && (
        <button type="button" onClick={handleClickUnbanIcon} className={chatUserButtonStyle}>
          <UnbanIcon />
        </button>
      )}
    </li>
  );
};
