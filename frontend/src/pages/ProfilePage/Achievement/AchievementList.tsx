import { useGetAchievementList } from 'hooks/useGetAchievementList';
import { useGetUserAchievement } from 'hooks/useGetUserAchievement';
import { useState } from 'react';
import { postUserAchievement } from 'services';
import { AchievementType } from 'types/profile';
import { Achievement } from './Achievement';

interface Props {
  userId: number;
  className?: string;
}

export const AchievementList = ({ userId, className }: Props) => {
  const [isPostDone, setIsPostDone] = useState<Boolean>(false);
  postUserAchievement(userId).then(() => setIsPostDone(true));
  const achievementList: AchievementType[] = useGetUserAchievement(userId).userAchievement;
  const allAchievementList: AchievementType[] = useGetAchievementList().achievementList;

  if (!isPostDone) return <div>loading Achievement List ...</div>;
  return (
    <div className={className}>
      <h1>Achievement</h1>
      <h2> debug: ID : {userId}</h2>
      {allAchievementList.map((value: AchievementType) => (
        <Achievement
          key={value.id}
          achieve={value}
          isAchieved={achievementList.some(active => active.id === value.id)}
        />
      ))}
    </div>
  );
};
