import { useState } from 'react';
import { postUserAchievement } from 'services';
import { AchievementType } from 'types/profile';
import { Achievement } from './Achievement';

interface Props {
  userId: number;
  className?: string;
}

const DUMMY_ACHIEVEMENT = [
  {
    id: 1,
    name: 'First Blood',
    description: 'Winning very first game',
    image: '/pochita_sample.png',
  },
  {
    id: 3,
    name: 'Killing Spree',
    description: 'Winning 3 games in a streak',
    image: '/pochita_sample.png',
  },
];

export const AchievementList = ({ userId, className }: Props) => {
  const [isPostDone, setIsPostDone] = useState<Boolean>(false);
  postUserAchievement(userId).then(() => setIsPostDone(true));

  if (!isPostDone) return <div>loading Achievement List ...</div>;
  return (
    <div className={className}>
      <h1>Achievement</h1>
      <h2> debug: ID : {userId}</h2>
      {DUMMY_ACHIEVEMENT.map((value: AchievementType) => (
        <Achievement key={value.id} achieve={value} />
      ))}
    </div>
  );
};
