import { useState } from 'react';

import { Modal } from 'common';

import { AchievementType } from 'types/achievement';
import { tmpAvatarStyle } from './tmpAvatarStyle';
import { AchievementPopup } from './AchievementPopup';

interface Props {
  userId: number;
}

const DUMMY_ACHIEVEMENT = [
  {
    id: 1,
    name: 'First Blood',
    description: 'Winning very first game',
    image: '/pochita_sample.png',
    achievedAt: '1970-01-01T00:00:00.000Z',
  },
  {
    id: 3,
    name: 'Killing Spree',
    description: 'Winning 3 games in a streak',
    image: '/pochita_sample.png',
    achievedAt: '1970-01-01T00:00:00.000Z',
  },
];

export const Achievement = ({ userId }: Props) => {
  const [isPopupShown, setPopupShown] = useState<Boolean>(false);

  function handleOpenPopup() {
    setPopupShown(true);
  }

  function handleClosePopup() {
    setPopupShown(false);
  }

  return (
    <main>
      <h1>Achievement List: {`${userId}`}</h1>
      {DUMMY_ACHIEVEMENT.map((value: AchievementType) => (
        <div key={value.id}>
          <img
            className={tmpAvatarStyle}
            src={value.image}
            alt="pochi"
            onMouseOver={handleOpenPopup}
            onFocus={handleOpenPopup}
          />
          <span>name: {value.name}</span>
          <span>description: {value.description}</span>
          {isPopupShown && (
            <Modal onClickClose={handleClosePopup}>
              <AchievementPopup achieve={value} />
            </Modal>
          )}
        </div>
      ))}
    </main>
  );
};
