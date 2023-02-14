import { UserInfoType } from 'types/user';

export const ProfileCard = ({ prop }: { prop: UserInfoType }) => {
  const { nickname, point, avatar } = prop;
  return (
    <div>
      <img src={avatar} alt="avatar" />
      <h1>{nickname}</h1>
      <p>point : {point}</p>
    </div>
  );
};
