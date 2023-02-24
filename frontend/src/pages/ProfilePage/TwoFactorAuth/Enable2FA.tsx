import { useSetRecoilState } from 'recoil';

import { DUMMY_2FA } from 'store/dummy2FA';
import { GithubIcon } from 'assets';

import { TwoFaButtonStyle } from './TwoFactorAuth.style';

export const Enable2FA = () => {
  const setDummy = useSetRecoilState(DUMMY_2FA);

  function handleClickIcon() {
    setDummy(prev => ({ ...prev, isChecked: true }));
  }

  return (
    <div>
      <div>Check 2FA Github</div>
      <button type="button" className={TwoFaButtonStyle} onClick={handleClickIcon}>
        <GithubIcon />
      </button>
    </div>
  );
};
