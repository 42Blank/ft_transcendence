import { MatchHistoryType } from 'types/profile';

interface Props {
  userId: number;
}

const DUMMY_MATCH_HISTORY = [
  {
    id: 1,
    name: 'First Blood',
    description: 'Winning very first game',
    image: '/pochita_sample.png',
    achievedAt: '1970-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    name: 'Killing Spree',
    description: 'Winning 3 games in a streak',
    image: '/pochita_sample.png',
    achievedAt: '1970-01-01T00:00:00.000Z',
  },
];

export const MatchHistoryList = ({ userId }: Props) => {
  return (
    <main>
      <h1>Match History List</h1>
      <h2> debug: ID : {userId}</h2>
      {DUMMY_MATCH_HISTORY.map((value: MatchHistoryType) => (
        <div key={value.id}>{value.id}</div>
      ))}
    </main>
  );
};
