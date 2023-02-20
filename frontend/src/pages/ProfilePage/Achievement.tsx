interface Props {
  userId: number;
}

const DUMMY_ACHIEVEMENT = [
  {
    id: 1,
    name: 'First Blood',
    description: 'Winning very first game',
    image: '/pochita_sample.png',
  },
];

export const Achievement = ({ userId }: Props) => {
  return <div>Achievement ID: {`${userId}`}</div>;
};
