import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { ROUTE } from 'common/constants';
import { userState } from 'store';

export const NavBar = () => {
  const userInfo = useRecoilValue(userState);
  const nav = useNavigate();

  function handleClickButton() {
    nav(ROUTE.LOGIN);
  }

  return (
    <header>
      <span>트센 트센</span>
      {userInfo.id >= 0 ? (
        <div>
          <span>{userInfo.nickname}</span>
        </div>
      ) : (
        <button type="button" onClick={handleClickButton}>
          <span>로그인</span>
        </button>
      )}
    </header>
  );
};
