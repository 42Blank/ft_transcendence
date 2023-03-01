import { AchievementType } from 'types/profile';

import { achievementElementWrapperStyle } from './AchievementElement.styles';

interface Props {
  achieve: AchievementType;
  isAchieved: Boolean;
}

export const AchievementElement = ({ achieve, isAchieved }: Props) => {
  //   const [isTooltipShown, setIsTooltipShown] = useState<Boolean>(false);

  //   function handleOpenTooltip() {
  //     setIsTooltipShown(true);
  //   }

  //   function handleCloseTooltip() {
  //     setIsTooltipShown(false);
  //   }

  return (
    <li className={achievementElementWrapperStyle}>
      <img
        src={achieve.image}
        width={100}
        height={100}
        alt="pochi"
        //   onMouseOver={handleOpenTooltip}
        //   onFocus={handleOpenTooltip}
        //   onMouseOut={handleCloseTooltip}
        //   onBlur={handleCloseTooltip}
      />
      <p>achieved : {`${isAchieved}`}</p>
      <span>name: {achieve.name}</span>
      {/* {isTooltipShown && (
          <Tooltip className={tmpAchievementTooltipStyle}>
            <AchievementTooltip achieve={achieve} />
          </Tooltip>
        )} */}
    </li>
  );
};
