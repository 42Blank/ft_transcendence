import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { getCurrentUserInfo } from 'services';
import { userState } from 'store';
import { ROUTE } from 'common/constants';
import { UserInfoType } from 'types/user';

export function useCheckLogin() {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (userInfo.id >= 0) {
      if (pathname === ROUTE.LOGIN) nav(ROUTE.CHAT);
      return;
    }
    getCurrentUserInfo()
      .then((res: void | UserInfoType) => {
        if (!res) throw Error();
        setUserInfo(res);
      })
      .then(() => {
        if (pathname === ROUTE.LOGIN) nav(ROUTE.CHAT);
      })
      .catch(() => {
        nav(ROUTE.LOGIN);
      });
  }, [setUserInfo, userInfo.id, pathname, nav]);
}
