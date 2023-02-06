import { API } from 'common/constants';

export const LoginPage = () => {
  return (
    <main>
      <a href={process.env.REACT_APP_SERVER + API.FT_AUTH}>
        <div>
          <span>로그인</span>
        </div>
      </a>
    </main>
  );
};
