import { UserInfoType } from 'types/user';

import { matchAvatarStyle, matchHistoryBoxStyle } from './MatchHistory.style';

interface Props {
  user: UserInfoType;
  result: 'WIN' | 'LOSE';
}

export const MatchHistoryBox = ({ user, result }: Props) => {
  return (
    <div className={matchHistoryBoxStyle}>
      <img className={matchAvatarStyle} src={user.avatar} width={100} height={100} alt={`${result}Avatar`} />
      <span className="win-lose">{result}</span>
      <span className="nick">{user.nickname}</span>
    </div>
  );
};
