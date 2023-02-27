import { GithubIcon } from 'assets';
import { Outlet } from 'react-router-dom';
import {
  githubLinkStyle,
  loginFooterStyle,
  loginLayoutCenterAlignStyle,
  loginLayoutImageStyle,
  loginLayoutWrapperStyle,
  loginMainInnerStyle,
  loginMainWrapperStyle,
} from './LoginLayout.styles';

interface TitleCharObj {
  src: string;
  alt: string;
  top: number;
  right: number;
}

export const LoginLayout = () => {
  const titleChar: TitleCharObj = {
    6: { src: '/images/kobeni.png', alt: 'kobeni', top: -60, right: -120 },
    7: { src: '/images/power.png', alt: 'power', top: -60, right: -120 },
    8: { src: '/images/makima.png', alt: 'makima', top: -60, right: -170 },
    9: { src: '/images/quanxi.png', alt: 'quanxi', top: -70, right: -130 },
    10: { src: '/images/yoru.png', alt: 'yoru', top: -80, right: -60 },
  }[Math.floor(Math.random() * 10)] ?? { src: '/images/csm.png', alt: 'chainsaw-man', top: -60, right: -180 };

  return (
    <>
      <div className={loginLayoutWrapperStyle}>
        <div className={loginLayoutCenterAlignStyle}>
          <img
            src={titleChar.src}
            alt={titleChar.alt}
            width={600}
            height={400}
            className={loginLayoutImageStyle(titleChar.top, titleChar.right)}
          />
          <main className={loginMainWrapperStyle}>
            <div className={loginMainInnerStyle}>
              <img src="/images/title.webp" width={490} height={140} alt="title logo" />
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <footer className={loginFooterStyle}>
        <a href="https://github.com/42Blank/ft_transcendence" className={githubLinkStyle}>
          <GithubIcon />
        </a>
      </footer>
    </>
  );
};
