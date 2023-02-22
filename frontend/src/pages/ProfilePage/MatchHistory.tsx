import { MatchHistoryType } from 'types/profile';

interface Props {
  history: MatchHistoryType;
}

export const MatchHistory = ({ history }: Props) => {
  return (
    <div key={history.id}>
      <p>Winner: {`${history.winner.nickname}`}</p>
      <p>Loser: {`${history.loser.nickname}`}</p>
      <p>Match time: {history.createdAt}</p>
    </div>
  );
};
