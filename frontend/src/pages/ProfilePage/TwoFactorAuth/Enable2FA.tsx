import { GithubIcon } from 'assets';
import { API } from 'common/constants';
import { loginLinkStyle } from 'pages/LoginPage/LoginPage.styles';

export const Enable2FA = () => {
  return (
    <div>
      <div>Check 2FA Github</div>
      <a href={process.env.REACT_APP_SERVER + API.GITHUB_AUTH} className={loginLinkStyle}>
        <span>TFA with</span>
        <GithubIcon />
        <span>Github</span>
      </a>
    </div>
  );
};
