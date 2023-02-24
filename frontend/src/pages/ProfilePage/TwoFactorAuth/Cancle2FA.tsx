import { useGetUser } from 'hooks';
import { deleteTwoFactorAuth } from 'services';

export const Cancle2FA = () => {
  const { refetch } = useGetUser();
  function handleClickCancleButton() {
    deleteTwoFactorAuth().then(() => refetch());
  }

  return (
    <div>
      <button type="button" onClick={handleClickCancleButton}>
        <span>cancle 2FA button</span>
      </button>
    </div>
  );
};
