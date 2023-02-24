import { useGetMatchHistory } from 'hooks';
import { MatchHistoryType } from 'types/profile';
import { MatchHistory } from './MatchHistory';

interface Props {
  userId: number;
  className?: string;
}

export const MatchHistoryList = ({ userId, className }: Props) => {
  const { matchHistory } = useGetMatchHistory(userId);

  //   const DUMMY_MATCH_HISTORY = [
  //     {
  //       id: 1,
  //       winner: user1,
  //       loser: user2,
  //       createdAt: '1970-01-01T00:00:00.000Z',
  //     },
  //     {
  //       id: 2,
  //       winner: user2,
  //       loser: user1,
  //       createdAt: '1970-01-01T00:00:00.000Z',
  //     },
  //   ];
  // ***
  return (
    <div className={className}>
      <h1>Match History List</h1>
      <h2> debug: ID : {userId}</h2>
      {matchHistory.map((value: MatchHistoryType) => (
        <MatchHistory key={value.id} history={value} />
      ))}
    </div>
  );
};
