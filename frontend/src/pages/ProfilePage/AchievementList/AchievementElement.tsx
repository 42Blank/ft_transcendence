import { AchievementType } from 'types/profile';

import {
  achievementElementImageStyle,
  achievementElementTextWrapperStyle,
  achievementElementWrapperStyle,
} from './AchievementElement.styles';

interface Props {
  achieve: AchievementType;
  isAchieved: boolean;
}

export const AchievementElement = ({ achieve, isAchieved }: Props) => {
  return (
    <li className={achievementElementWrapperStyle(isAchieved)}>
      <img
        src={achieve.image}
        width={100}
        height={100}
        alt={`${achieve.name}-achievement`}
        className={achievementElementImageStyle}
      />
      <div className={achievementElementTextWrapperStyle}>
        <span>{achieve.name}</span>
        <span>{achieve.description}</span>
      </div>
    </li>
  );
};
