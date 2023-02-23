import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { useGetAllUserList, useGetFriendList } from 'hooks';
import { onlineUserListState } from 'store';
import { FriendsListElement } from './FriendsListElement';

import { friendsListStyle, friendsListTabButtonStyle, friendsListTabWrapperStyle } from './FriendsList.styles';

interface Props {
  isOpen: boolean;
}

export const FriendsList = ({ isOpen }: Props) => {
  const { userList } = useGetAllUserList();
  const onlineUserList = useRecoilValue(onlineUserListState);
  const { friendList } = useGetFriendList();
  const [isFriendTab, setIsFriendTab] = useState(true);

  function handleClickFriendsListButton() {
    setIsFriendTab(true);
  }
  function handleClickAllUserListButton() {
    setIsFriendTab(false);
  }

  return (
    <aside className={friendsListStyle(isOpen)}>
      <div className={friendsListTabWrapperStyle}>
        <button type="button" className={friendsListTabButtonStyle(isFriendTab)} onClick={handleClickFriendsListButton}>
          <span>친구 목록</span>
        </button>
        <button
          type="button"
          className={friendsListTabButtonStyle(!isFriendTab)}
          onClick={handleClickAllUserListButton}
        >
          <span>전체 유저 목록</span>
        </button>
      </div>
      <ul>
        {(isFriendTab ? friendList : userList).map(userInfo => (
          <FriendsListElement
            userInfo={userInfo}
            isOnline={onlineUserList.includes(userInfo.id)}
            key={`friend-${userInfo.id}`}
          />
        ))}
      </ul>
    </aside>
  );
};
