import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../common/constants';
import { putTwoFactorAuth } from '../../../services';

export const Enable2FA = () => {
  const nav = useNavigate();

  function handleClickCancleButton() {
    putTwoFactorAuth().then(() => nav(ROUTE.LOGIN));
  }

  return (
    <div>
      <button type="button" onClick={handleClickCancleButton}>
        <span>2차 인증 활성화</span>
      </button>
      <div>2차 인증을 활성화하게 되면 다시 로그인해야합니다!!</div>
    </div>
  );
};
