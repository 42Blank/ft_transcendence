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
    getCurrentUserInfo()
      .then((res: void | UserInfoType) => {
        if (!res) throw Error();
        setUserInfo(res);
      })
      .catch(() => {
        nav(ROUTE.LOGIN);
      });
  }, []);

  useEffect(() => {
    if (userInfo.id !== -1 && pathname === ROUTE.LOGIN) nav(ROUTE.CHAT);
  }, [userInfo]);
}
