import { Route, Routes } from 'react-router-dom';

import { LoginLayout, MainLayout } from 'common';
import { ChatPage, GameListPage, LoginCallbackPage, LoginPage, MainPage, ProfilePage } from 'pages';
import { ROUTE } from 'common/constants';
import { useCheckLogin } from 'hooks';

export const App = () => {
  useCheckLogin();
  return (
    <Routes>
      <Route path={ROUTE.ROOT} element={<MainLayout />}>
        <Route path={ROUTE.CHAT} element={<MainPage />} />
        <Route path={`${ROUTE.CHAT}/:id`} element={<ChatPage />} />
        <Route path={ROUTE.GAME} element={<GameListPage />} />
        <Route path={`${ROUTE.GAME}/:id`} element={<div>hihi</div>} />
        <Route path={ROUTE.PROFILE} element={<ProfilePage />} />
      </Route>
      <Route path={ROUTE.ROOT} element={<LoginLayout />}>
        <Route path={ROUTE.LOGIN} element={<LoginPage />} />
        <Route path={ROUTE.LOGIN_CHECK} element={<LoginCallbackPage />} />
        <Route path={ROUTE.REGISTER} element={<div>회원가입합쉬다~~</div>} />
      </Route>
    </Routes>
  );
};
