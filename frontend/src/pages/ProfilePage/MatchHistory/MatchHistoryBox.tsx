import { UserInfoType } from 'types/user';

import { matchAvatarStyle, matchHistoryBoxStyle } from './MatchHistory.style';

interface Props {
  user: UserInfoType;
  key: 'WIN' | 'LOSE';
}

export const MatchHistoryBox = ({ user, key }: Props) => {
  return (
    <div className={matchHistoryBoxStyle}>
      <img className={matchAvatarStyle} src={user.avatar} width={100} height={100} alt={`${key}Avatar`} />
      <span className="win-lose">{key}</span>
      <span className="nick">{user.nickname}</span>
    </div>
  );
};
