import { AchievementType } from 'types/achievement';

interface Props {
  achieve: AchievementType;
}

export const AchievementPopup = ({ achieve }: Props) => {
  return <div>achieve : {achieve.description}</div>;
};
