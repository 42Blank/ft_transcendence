import { Route, Routes } from 'react-router-dom';

import { ROUTE } from './constants';

export const App = () => {
  return (
    <Routes>
      <Route path={ROUTE.ROOT} element={<div>아아아기본 레이아웃</div>}>
        <Route path={ROUTE.CHAT} element={<div>메인 화면 (채팅)</div>} />
        <Route path={ROUTE.GAME} element={<div>게임</div>} />
        <Route path={ROUTE.PROFILE} element={<div>프로필</div>} />
      </Route>
      <Route path={ROUTE.LOGIN} element={<div>로그인 페이지 레이아웃</div>}>
        <Route path={ROUTE.ROOT} element={<div>로그인합쉬다~</div>} />
        <Route path={ROUTE.REGISTER} element={<div>회원가입합쉬다~~</div>} />
      </Route>
    </Routes>
  );
};
