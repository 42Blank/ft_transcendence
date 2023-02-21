import { useState } from 'react';

import { Tooltip } from 'common';

import { AchievementType } from 'types/achievement';
import { tmpAvatarStyle } from './tmpAvatarStyle';
import { tmpAchievementStyle } from './tmpAchievement.style';
// import { AchievementTooltip } from './AchievementTooltip';

interface Props {
  achieve: AchievementType;
}

export const Achievement = ({ achieve }: Props) => {
  const [isTooltipShown, setTooltipShown] = useState<Boolean>(false);

  function handleOpenTooltip() {
    setTooltipShown(true);
  }

  function handleCloseTooltip() {
    setTooltipShown(false);
  }

  return (
    <main>
      <div className={tmpAchievementStyle}>
        <img
          className={tmpAvatarStyle}
          src={achieve.image}
          alt="pochi"
          onMouseOver={handleOpenTooltip}
          onFocus={handleOpenTooltip}
          onMouseOut={handleCloseTooltip}
          onBlur={handleCloseTooltip}
        />
        <span>name: {achieve.name}</span>
        {/* {isTooltipShown && (
          <Modal onClickClose={handleCloseTooltip} className={tmpTooltipStyle}>
            <AchievementTooltip achieve={achieve} />
          </Modal>
        )} */}
        {isTooltipShown && <Tooltip text={achieve.description} />}
      </div>
    </main>
  );
};
