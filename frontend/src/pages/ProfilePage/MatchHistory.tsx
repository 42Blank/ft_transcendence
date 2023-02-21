interface Props {
  userId: number;
}

export const MatchHistory = ({ userId }: Props) => {
  return <div>Match History userID: {userId}</div>;
};
