import { AchievementType } from 'types/profile';
import { Achievement } from './Achievement';

interface Props {
  userId: number;
}

const DUMMY_ACHIEVEMENT = [
  {
    id: 1,
    name: 'First Blood',
    description: 'Winning very first game',
    image: '/pochita_sample.png',
    achievedAt: '1970-01-01T00:00:00.000Z',
  },
  {
    id: 3,
    name: 'Killing Spree',
    description: 'Winning 3 games in a streak',
    image: '/pochita_sample.png',
    achievedAt: '1970-01-01T00:00:00.000Z',
  },
];

export const AchievementList = ({ userId }: Props) => {
  return (
    <main>
      <h1>Achievement</h1>
      <h2> debug: ID : {userId}</h2>
      {DUMMY_ACHIEVEMENT.map((value: AchievementType) => (
        <Achievement key={value.id} achieve={value} />
      ))}
    </main>
  );
};
