import { UserInfoType } from 'types/user';
import { tmpAvatarStyle } from './tmpAvatarStyle';

export const ProfileCard = ({ user }: { user: UserInfoType }) => {
  const { nickname, point, avatar } = user;
  return (
    <div>
      <img className={tmpAvatarStyle} src={avatar} alt="avatar" />
      <h1>{nickname}</h1>
      <p>point : {point}</p>
    </div>
  );
};
