import { tmpAvatarStyle } from './tmpAvatarStyle';

interface Props {
  userId: number;
}

interface AchievementType {
  id: number;
  name: string;
  description: string;
  image: string;
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

export const Achievement = ({ userId }: Props) => {
  function handleTest(value: AchievementType) {
    return <div>{value.description}</div>;
  }

  return (
    <main>
      <h1>Achievement List: {`${userId}`}</h1>
      {DUMMY_ACHIEVEMENT.map((value: AchievementType) => (
        <div key={value.id}>
          <img
            className={tmpAvatarStyle}
            src={value.image}
            alt="pochi"
            onMouseOver={() => handleTest(value)}
            onFocus={() => handleTest(value)}
          />
          <span>name: {value.name}</span>
          <span>description: {value.description}</span>
        </div>
      ))}
    </main>
  );
};
