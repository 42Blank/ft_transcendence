import { LoginLayout, MainLayout } from 'common';
import { LoginCallbackPage, LoginPage } from 'pages';
import { Route, Routes } from 'react-router-dom';

import { ROUTE } from 'common/constants';
import { useCheckLogin } from 'hooks';

export const App = () => {
  useCheckLogin();
  return (
    <Routes>
      <Route path={ROUTE.ROOT} element={<MainLayout />}>
        <Route path={ROUTE.CHAT} element={<div>메인 화면 (채팅)</div>} />
        <Route path={ROUTE.GAME} element={<div>게임</div>} />
        <Route path={ROUTE.PROFILE} element={<div>프로필</div>} />
      </Route>
      <Route path={ROUTE.ROOT} element={<LoginLayout />}>
        <Route path={ROUTE.LOGIN} element={<LoginPage />} />
        <Route path={ROUTE.LOGIN_CHECK} element={<LoginCallbackPage />} />
        <Route path={ROUTE.REGISTER} element={<div>회원가입합쉬다~~</div>} />
      </Route>
    </Routes>
  );
};
