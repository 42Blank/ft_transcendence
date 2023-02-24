import { AchievementType } from 'types/profile';

interface Props {
  achieve: AchievementType;
}

export const AchievementTooltip = ({ achieve }: Props) => {
  return (
    <div>
      <p>description : {achieve.description}</p>
      <p>achievedAt : {achieve.achievedAt}</p>
    </div>
  );
};
