import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal } from 'common';
import { ROUTE } from 'common/constants';
import { deleteTwoFactorAuth, putTwoFactorAuth } from 'services';
import { useGetUser } from 'hooks';

export const TwoFactorAuthSection = () => {
  const { data: user, refetch } = useGetUser();
  const nav = useNavigate();
  const [isModalShown, setIsModalShown] = useState<Boolean>(false);

  function handleOpenModal() {
    setIsModalShown(true);
  }

  function handleCloseModal() {
    setIsModalShown(false);
  }

  function handleClickCancelButton() {
    deleteTwoFactorAuth().then(() => refetch());
  }

  function handleClickEnableButton() {
    putTwoFactorAuth().then(() => nav(ROUTE.LOGIN));
  }

  return (
    <>
      <div>
        <button type="button" onClick={handleOpenModal}>
          <span>Two-Factor Authentication</span>
        </button>
        <input type="checkbox" checked={user.isTwoFactorAuth} readOnly />
      </div>
      {isModalShown && (
        <Modal onClickClose={handleCloseModal}>
          {user.isTwoFactorAuth ? (
            <div>
              <button type="button" onClick={handleClickCancelButton}>
                <span>cancle 2FA button</span>
              </button>
            </div>
          ) : (
            <div>
              <button type="button" onClick={handleClickEnableButton}>
                <span>2차 인증 활성화</span>
              </button>
              <div>2차 인증을 활성화하게 되면 다시 로그인해야합니다!!</div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};
