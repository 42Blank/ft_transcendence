import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetUser } from 'hooks';
import { Button } from 'common';
import { MatchHistoryList } from './MatchHistoryList';
import { ProfileHeader } from './ProfileHeader';
import { AchievementList } from './AchievementList';

import {
  profileContainerStyle,
  profileTabBlankStyle,
  profileTabStyle,
  profileTabWrapperStyle,
} from './ProfilePage.styles';

export const ProfilePage = () => {
  const { id } = useParams();
  const { data: profile } = useGetUser(id);
  const [isAchievementSelected, setIsAchievementSelected] = useState<boolean>(false);

  function handleClickAchievementButton() {
    setIsAchievementSelected(true);
  }

  function handleClickMatchHistoryButton() {
    setIsAchievementSelected(false);
  }

  if (profile.id === -1) return <span>Loading profile....</span>;
  return (
    <main className={profileContainerStyle}>
      <ProfileHeader userId={id} />
      <div className={profileTabWrapperStyle}>
        <Button onClick={handleClickMatchHistoryButton} className={profileTabStyle(!isAchievementSelected)}>
          <span>전적</span>
        </Button>
        <Button onClick={handleClickAchievementButton} className={profileTabStyle(isAchievementSelected)}>
          <span>업적</span>
        </Button>
        <div className={profileTabBlankStyle} />
      </div>
      {isAchievementSelected ? <AchievementList userId={profile.id} /> : <MatchHistoryList userId={profile.id} />}
    </main>
  );
};
