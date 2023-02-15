import { GithubIcon } from 'assets';
import { Outlet } from 'react-router-dom';
import { githubLinkStyle, loginFooterStyle, loginHeaderStyle, loginMainWrapperStyle } from './LoginLayout.styles';

export const LoginLayout = () => {
  const isSamurai = Math.random() < 0.2;

  return (
    <>
      <header className={loginHeaderStyle}>
        <img
          src={isSamurai ? 'samurai.png' : 'csm.png'}
          alt={isSamurai ? 'samurai-sword' : 'chainsaw-man'}
          width={600}
          height={350}
        />
      </header>
      <div className={loginMainWrapperStyle}>
        <Outlet />
      </div>
      <footer className={loginFooterStyle}>
        <a href="https://github.com/42Blank/ft_transcendence" className={githubLinkStyle}>
          <GithubIcon />
        </a>
      </footer>
    </>
  );
};
