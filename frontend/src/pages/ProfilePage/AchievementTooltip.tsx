import { AchievementType } from 'types/achievement';

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
