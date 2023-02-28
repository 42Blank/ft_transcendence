import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { useGetAllUserList, useGetFriendList } from 'hooks';
import { onlineUserListState } from 'store';
import { FriendsListElement } from './FriendsListElement';

import { friendsListStyle, friendsListTabButtonStyle, friendsListTabWrapperStyle } from './FriendsList.styles';
// import { userInfo } from 'os';

interface Props {
  isOpen: boolean;
}

export const FriendsList = ({ isOpen }: Props) => {
  const { userList, refetch: refetchAllUserList } = useGetAllUserList();
  const onlineUserList = useRecoilValue(onlineUserListState);
  const { friendList, refetch: refetfriendList } = useGetFriendList();
  const [isFriendTab, setIsFriendTab] = useState(true);

  function handleClickFriendsListButton() {
    refetfriendList();
    setIsFriendTab(true);
  }
  function handleClickAllUserListButton() {
    refetchAllUserList();
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
        {(isFriendTab ? friendList : userList).map(userInfo1 => (
          <FriendsListElement
            userInfo={userInfo1}
            state={onlineUserList.find(({ userId }) => userId === userInfo1.id).state} // TODO: 동작하는지 check 필요
            key={`friend-${userInfo1.id}`}
          />
        ))}
      </ul>
    </aside>
  );
};
