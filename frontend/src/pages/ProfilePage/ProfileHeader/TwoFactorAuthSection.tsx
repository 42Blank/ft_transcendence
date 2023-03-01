import { useNavigate } from 'react-router-dom';

import { Button } from 'common';
import { ROUTE } from 'common/constants';
import { deleteTwoFactorAuth, putTwoFactorAuth } from 'services';
import { useGetUser } from 'hooks';

import { profileButtonStyle } from './ProfileHeader.styles';

export const TwoFactorAuthSection = () => {
  const {
    data: { isTwoFactorAuth },
    refetch,
  } = useGetUser();
  const nav = useNavigate();

  async function handleClickButton() {
    if (!isTwoFactorAuth) {
      alert('2차 인증을 활성화하면 재로그인이 필요합니다.');
      await putTwoFactorAuth().then(() => nav(ROUTE.LOGIN));
      return;
    }
    await deleteTwoFactorAuth().then(() => refetch());
  }

  return (
    <Button onClick={handleClickButton} className={profileButtonStyle}>
      <span>{isTwoFactorAuth ? '2차 인증 설정됨' : '2차 인증'}</span>
    </Button>
  );
};
