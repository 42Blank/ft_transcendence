import { AchievementType } from 'types/achievement';

interface Props {
  achieve: AchievementType;
}

export const AchievementPopup = ({ achieve }: Props) => {
  return (
    <div>
      <p>achieve : {achieve.description}</p>
      <p>achievedAt : {achieve.achievedAt}</p>
    </div>
  );
};
