import { useEffect, useState } from 'react';

import { postUserAchievement } from 'services';
import { useGetAchievementList } from 'hooks/useGetAchievementList';
import { useGetUserAchievement } from 'hooks/useGetUserAchievement';
import { AchievementType } from 'types/profile';
import { AchievementElement } from './AchievementElement';

import {
  achievementListLoadingStyle,
  achievementListWrapperDivStyle,
  achievementListWrapperStyle,
} from './AchievementList.styles';

interface Props {
  userId: number;
}

export const AchievementList = ({ userId }: Props) => {
  const [isPostDone, setIsPostDone] = useState<Boolean>(false);
  const { achievementList } = useGetAchievementList();
  const { userAchievement, refetch } = useGetUserAchievement(userId);

  useEffect(() => {
    postUserAchievement(userId).then(() => {
      setIsPostDone(true);
      refetch();
    });
  }, [userId]);

  return (
    <div className={achievementListWrapperDivStyle}>
      <ul className={achievementListWrapperStyle}>
        {isPostDone ? (
          achievementList.map((value: AchievementType) => (
            <AchievementElement
              key={value.id}
              achieve={value}
              isAchieved={userAchievement.some(active => active.id === value.id)}
            />
          ))
        ) : (
          <span className={achievementListLoadingStyle}>업적 목록을 불러오고 있습니다...</span>
        )}
      </ul>
    </div>
  );
};
