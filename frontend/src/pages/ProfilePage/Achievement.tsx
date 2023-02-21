import { useState } from 'react';

import { Modal } from 'common';

import { AchievementType } from 'types/achievement';
import { tmpAvatarStyle } from './tmpAvatarStyle';
import { AchievementPopup } from './AchievementPopup';

interface Props {
  achieve: AchievementType;
}

export const Achievement = ({ achieve }: Props) => {
  const [isPopupShown, setPopupShown] = useState<Boolean>(false);

  function handleOpenPopup() {
    setPopupShown(true);
  }

  function handleClosePopup() {
    setPopupShown(false);
  }

  return (
    <main>
      <div>
        <img
          className={tmpAvatarStyle}
          src={achieve.image}
          alt="pochi"
          onMouseOver={handleOpenPopup}
          onFocus={handleOpenPopup}
        />
        <span>name: {achieve.name}</span>
        <span>description: {achieve.description}</span>
        {isPopupShown && (
          <Modal onClickClose={handleClosePopup}>
            <AchievementPopup achieve={achieve} />
          </Modal>
        )}
      </div>
    </main>
  );
};
