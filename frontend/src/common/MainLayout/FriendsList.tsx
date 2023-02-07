import { friendsListStyles } from './FriendsList.styles';

export const FriendsList = () => {
  return (
    <aside className={friendsListStyles}>
      <h2>친구 목록</h2>
      <ul>
        <li>자송</li>
        <li>영차</li>
        <li>지소캉</li>
        <li>인초</li>
        <li>지최</li>
      </ul>
    </aside>
  );
};
