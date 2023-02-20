interface Props {
  userId: number;
}

export const Achievement = ({ userId }: Props) => {
  return <div>Achievement ID: {`${userId}`}</div>;
};
