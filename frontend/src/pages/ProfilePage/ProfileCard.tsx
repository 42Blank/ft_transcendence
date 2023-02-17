import { UserInfoType } from 'types/user';

export const ProfileCard = ({ user }: { user: UserInfoType }) => {
  const { nickname, point, avatar } = user;
  return (
    <div>
      <img src={avatar} alt="avatar" />
      <h1>{nickname}</h1>
      <p>point : {point}</p>
    </div>
  );
};
