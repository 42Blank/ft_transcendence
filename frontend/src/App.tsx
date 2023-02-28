import { Route, Routes } from 'react-router-dom';

import { LoginLayout, MainLayout, RootComponent } from 'common';
import { ROUTE } from 'common/constants';
import {
  ChatListPage,
  ChatPage,
  GameListPage,
  GamePage,
  GameResultPage,
  Login2FaCallbackPage,
  Login2FaPage,
  LoginCallbackPage,
  LoginPage,
  LoginRandomPage,
  ProfilePage,
  RegisterPage,
} from 'pages';

export const App = () => {
  return (
    <Routes>
      <Route path={ROUTE.ROOT} element={<MainLayout />}>
        <Route path={ROUTE.ROOT} element={<RootComponent />}>
          <Route path={ROUTE.CHAT} element={<ChatListPage />} />
          <Route path={`${ROUTE.CHAT}/:id`} element={<ChatPage />} />
          <Route path={ROUTE.GAME} element={<GameListPage />} />
          <Route path={`${ROUTE.GAME}/:id`} element={<GamePage />} />
          <Route path={`${ROUTE.RESULT}/:id`} element={<GameResultPage />} />
          <Route path={ROUTE.PROFILE} element={<ProfilePage />} />
          <Route path={`${ROUTE.PROFILE}/:id`} element={<ProfilePage />} />
        </Route>
      </Route>
      <Route path={ROUTE.ROOT} element={<LoginLayout />}>
        <Route path={ROUTE.LOGIN} element={<LoginPage />} />
        <Route path={ROUTE.LOGIN_CHECK} element={<LoginCallbackPage />} />
        <Route path={ROUTE.LOGIN_RANDOM} element={<LoginRandomPage />} />
        <Route path={ROUTE.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTE.LOGIN_2FA} element={<Login2FaPage />} />
        <Route path={ROUTE.LOGIN_2FA_CHECK} element={<Login2FaCallbackPage />} />
      </Route>
    </Routes>
  );
};
