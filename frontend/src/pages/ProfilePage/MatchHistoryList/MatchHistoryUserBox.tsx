import { Avatar } from 'common';
import { COMMON_SIZES } from 'styles';
import { UserInfoType } from 'types/user';

import {
  userAvatarStyle,
  userBoxAvatarWrapperStyle,
  userBoxNicknameStyle,
  userBoxTagStyle,
  userBoxWrapperStyle,
} from './MatchHistoryUserBox.styles';

interface Props {
  user: UserInfoType;
  isWon?: boolean;
  isRight?: boolean;
}

export const MatchHistoryUserBox = ({ user, isWon, isRight }: Props) => {
  return (
    <div className={userBoxWrapperStyle(isRight)}>
      <div className={userBoxAvatarWrapperStyle}>
        <div className={userBoxTagStyle(isWon)}>
          <span>{isWon ? '승리' : '패배'}</span>
        </div>
        <Avatar userAvatar={user.avatar} size={COMMON_SIZES.ICON_XXLARGE} className={userAvatarStyle(isWon)} />
      </div>
      <span className={userBoxNicknameStyle}>{user.nickname}</span>
    </div>
  );
};
