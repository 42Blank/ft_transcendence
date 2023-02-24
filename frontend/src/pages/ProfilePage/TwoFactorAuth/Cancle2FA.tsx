import { useSetRecoilState } from 'recoil';

import { DUMMY_2FA } from 'store/dummy2FA';

export const Cancle2FA = () => {
  const setDummy = useSetRecoilState(DUMMY_2FA);

  function handleClickCancleButton() {
    setDummy(prev => ({ ...prev, isChecked: false }));
  }
  return (
    <div>
      <button type="button" onClick={handleClickCancleButton}>
        <span>cancle 2FA button</span>
      </button>
    </div>
  );
};
