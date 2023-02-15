import { Route, Routes } from 'react-router-dom';

import { LoginLayout, MainLayout, RootComponent } from 'common';
import { ChatPage, GameListPage, LoginCallbackPage, LoginPage, ChatListPage, GamePage, ProfilePage } from 'pages';

import { ROUTE } from 'common/constants';

export const App = () => {
  return (
    <Routes>
      <Route path={ROUTE.ROOT} element={<MainLayout />}>
        <Route path={ROUTE.ROOT} element={<RootComponent />}>
          <Route path={ROUTE.CHAT} element={<ChatListPage />} />
          <Route path={`${ROUTE.CHAT}/:id`} element={<ChatPage />} />
          <Route path={ROUTE.GAME} element={<GameListPage />} />
          <Route path={`${ROUTE.GAME}/:id`} element={<GamePage />} />
          <Route path={ROUTE.PROFILE} element={<ProfilePage />} />
          <Route path={`${ROUTE.PROFILE}/:id`} element={<ProfilePage />} />
        </Route>
      </Route>
      <Route path={ROUTE.ROOT} element={<LoginLayout />}>
        <Route path={ROUTE.LOGIN} element={<LoginPage />} />
        <Route path={ROUTE.LOGIN_CHECK} element={<LoginCallbackPage />} />
        <Route path={ROUTE.REGISTER} element={<div>회원가입합쉬다~~</div>} />
      </Route>
    </Routes>
  );
};
