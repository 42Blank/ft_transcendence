import { useSetRecoilState } from 'recoil';

import { userOperationState } from 'store';
import { Button } from 'common';
import { ChatUserRoleType } from 'types/chat';
import { UserInfoType } from 'types/user';
import { UnbanIcon } from 'assets';

import { chatUserButtonStyle, chatUserDrawerInnerStyle } from './ChatUserListElement.styles';

interface Props {
  banUser: UserInfoType;
  currentUserRole: ChatUserRoleType;
}

export const BanUserOperationBox = ({ banUser, currentUserRole }: Props) => {
  const { id } = banUser;
  const setOperation = useSetRecoilState(userOperationState);

  function handleClickUnbanIcon() {
    setOperation({ userId: id, operation: 'unban' });
  }

  return (
    <div className={chatUserDrawerInnerStyle}>
      {currentUserRole !== 'user' && (
        <Button onClick={handleClickUnbanIcon} className={chatUserButtonStyle}>
          <UnbanIcon />
          <span>밴 해제</span>
        </Button>
      )}
    </div>
  );
};
