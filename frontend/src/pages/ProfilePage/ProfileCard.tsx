import { UserInfoType } from 'types/user';
import { profileCardAvatarStyle, profileCardStyle } from './ProfileCard.style';

export const ProfileCard = ({ user }: { user: UserInfoType }) => {
  const { nickname, point, avatar } = user;
  return (
    <div className={profileCardStyle}>
      <img className={`avatar ${profileCardAvatarStyle}`} src={avatar} width={200} height={200} alt="avatar" />
      <span className="nick">{nickname}</span>
      <span className="point-text">point</span>
      <span className="point">{point}</span>
    </div>
  );
};
