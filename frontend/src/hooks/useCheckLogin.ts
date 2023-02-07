import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { getCurrentUserInfo } from 'services';
import { userState } from 'store';
import { UserInfoType } from 'types/auth';

export function useCheckLogin() {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (userInfo.id >= 0) return;
    getCurrentUserInfo()
      .then((res: void | UserInfoType) => {
        if (!res) throw Error();
        setUserInfo(res);
      })
      .catch(() => {
        nav('/login');
      });
  }, [setUserInfo, userInfo.id, pathname, nav]);
}
