import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ROUTE } from 'common/constants';
import { getFtCallbackCode } from 'services';
import { getLogin } from '../../services/getLogin';
import { postRegister } from '../../services/postRegister';
import { sleep } from '../../utils';
import { getErrorMessage, isFtError } from '../../utils/error';
import { loginCallbackLogoImageStyle, loginCallbackWrapperStyle } from './LoginCallbackPage.styles';

// TODO: refactor me!! - by ycha
export const LoginCallbackPage = () => {
  const [param] = useSearchParams();
  const nav = useNavigate();
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  useEffect(() => {
    const code = param.get('code');
    if (!code) {
      nav(ROUTE.LOGIN);
      return;
    }
    (async () => {
      let ftProfile: { username: string; image_url: string };

      setLoadingMessage(`42인증 시도...`);
      await sleep(1500);
      try {
        ftProfile = await getFtCallbackCode(code);
        setLoadingMessage(`42인증 완료 : ${JSON.stringify(ftProfile, null, 2)}`);
      } catch (e: unknown) {
        setLoadingMessage(`42인증 실패 : ${getErrorMessage(e)}`);
        return;
      }
      await sleep(3000);

      setLoadingMessage(`로그인 1차 시도...`);
      await sleep(1500);
      try {
        const user = await getLogin();
        // TODO: user 정보를 전역 상태로 관리하도록 리팩토링 - by ycha
        setLoadingMessage(`로그인 1차 성공 : ${JSON.stringify(user, null, 2)})`);
      } catch (e: unknown) {
        const errorMessage = getErrorMessage(e);
        if (isFtError(e) && e.statusCode === 403) {
          setLoadingMessage(`로그인 1차 실패 (회원가입 필요) : ${errorMessage}`);
        } else {
          setLoadingMessage(`로그인 1차 실패 : ${errorMessage}`);
        }
      }
      await sleep(3000);

      setLoadingMessage(`회원가입 시도...`);
      await sleep(1500);
      try {
        const user = await postRegister(ftProfile.username, ftProfile.image_url);
        setLoadingMessage(`회원가입 성공 : ${JSON.stringify(user, null, 2)}`);
      } catch (e: unknown) {
        setLoadingMessage(`회원가입 실패 : ${getErrorMessage(e)}`);
      }
      await sleep(3000);

      setLoadingMessage(`로그인 2차 시도...`);
      await sleep(1500);
      try {
        const user = await getLogin();
        // TODO: user 정보를 전역 상태로 관리하도록 리팩토링 - by ycha
        setLoadingMessage(`로그인 2차 성공 : ${JSON.stringify(user, null, 2)})`);
      } catch (e: unknown) {
        setLoadingMessage(`로그인 2차 실패 : ${getErrorMessage(e)}`);
        return;
      }

      await sleep(3000);
      nav(ROUTE.CHAT);
    })();
  }, [param, nav]);

  return (
    <main className={loginCallbackWrapperStyle}>
      <img src="/logo.png" alt="pochitandence logo" width={280} height={80} className={loginCallbackLogoImageStyle} />
      <span>로그인 중...</span>
      <span style={{ whiteSpace: 'pre-line' }}>{loadingMessage}</span>
    </main>
  );
};
