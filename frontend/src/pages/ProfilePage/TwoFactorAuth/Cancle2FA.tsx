import { deleteTwoFactorAuth } from 'services';

export const Cancle2FA = () => {
  function handleClickCancleButton() {
    deleteTwoFactorAuth();
  }

  return (
    <div>
      <button type="button" onClick={handleClickCancleButton}>
        <span>cancle 2FA button</span>
      </button>
    </div>
  );
};
