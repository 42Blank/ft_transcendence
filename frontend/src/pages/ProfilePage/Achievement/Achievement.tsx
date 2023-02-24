import { useState } from 'react';

import { Tooltip } from 'common';
import { AchievementType } from 'types/profile';
import { AchievementTooltip } from './AchievementTooltip';

import { tmpAvatarStyle } from '../tmpAvatarStyle';
import { tmpAchievementStyle } from './tmpAchievement.style';
import { tmpAchievementTooltipStyle } from './tmpAchievementTooltip.style';

interface Props {
  achieve: AchievementType;
}

export const Achievement = ({ achieve }: Props) => {
  const [isTooltipShown, setIsTooltipShown] = useState<Boolean>(false);

  function handleOpenTooltip() {
    setIsTooltipShown(true);
  }

  function handleCloseTooltip() {
    setIsTooltipShown(false);
  }

  return (
    <main>
      <div className={tmpAchievementStyle}>
        <img
          className={tmpAvatarStyle}
          //   src={achieve.image}  will be used !
          src="/pochita_sample.png" // this is for test
          width={100}
          height={100}
          alt="pochi"
          onMouseOver={handleOpenTooltip}
          onFocus={handleOpenTooltip}
          onMouseOut={handleCloseTooltip}
          onBlur={handleCloseTooltip}
        />
        <span>name: {achieve.name}</span>
        {isTooltipShown && (
          <Tooltip className={tmpAchievementTooltipStyle}>
            <AchievementTooltip achieve={achieve} />
          </Tooltip>
        )}
      </div>
    </main>
  );
};
