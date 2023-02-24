import { useGetMatchHistory } from 'hooks';
import { MatchHistoryType } from 'types/profile';
import { MatchHistory } from './MatchHistory';

interface Props {
  userId: number;
  className?: string;
}

export const MatchHistoryList = ({ userId, className }: Props) => {
  const { matchHistory } = useGetMatchHistory(userId);

  return (
    <div className={className}>
      <h1>Match History List</h1>
      <h2> debug: ID : {userId}</h2>
      {matchHistory.map((value: MatchHistoryType) => (
        <MatchHistory key={value.id} history={value} userId={userId} />
      ))}
    </div>
  );
};
