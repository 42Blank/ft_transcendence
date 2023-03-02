import { Outlet } from 'react-router-dom';

import { GithubIcon } from 'assets';

import {
  githubLinkStyle,
  loginLayoutCenterAlignStyle,
  loginLayoutImageStyle,
  loginLayoutScreenWrapperStyle,
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
    5: { src: '/images/kobeni.png', alt: 'kobeni', top: -60, right: -120 },
    6: { src: '/images/power.png', alt: 'power', top: -60, right: -120 },
    7: { src: '/images/makima.png', alt: 'makima', top: -60, right: -170 },
    8: { src: '/images/quanxi.png', alt: 'quanxi', top: -70, right: -130 },
    9: { src: '/images/yoru.png', alt: 'yoru', top: -80, right: -60 },
  }[Math.floor(Math.random() * 10)] ?? { src: '/images/csm.png', alt: 'chainsaw-man', top: -60, right: -180 };

  return (
    <div className={loginLayoutScreenWrapperStyle}>
      <div className={loginLayoutCenterAlignStyle}>
        <img
          src={titleChar.src}
          alt={titleChar.alt}
          width={600}
          height={400}
          className={loginLayoutImageStyle(titleChar.top, titleChar.right)}
        />
        <main className={loginMainWrapperStyle}>
          <img src="/images/title.png" width={490} height={140} alt="title logo" />
          <Outlet />
        </main>
        <a href="https://github.com/42Blank/ft_transcendence" className={githubLinkStyle}>
          <GithubIcon />
        </a>
      </div>
    </div>
  );
};
