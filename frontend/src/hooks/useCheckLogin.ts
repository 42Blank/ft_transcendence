import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { ROUTE } from 'common/constants';
import { getCurrentUserInfo } from 'services';
import { userState } from 'store';
import { UserInfoType } from 'types/user';
import { sockets } from './useHandleSocket';

export function useCheckLogin() {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (sockets.chatSocket) {
      sockets.chatSocket.disconnect();
      sockets.chatSocket = null;
    }

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
    else if (userInfo.id === -1) nav(ROUTE.LOGIN);
  }, [userInfo]);
}
