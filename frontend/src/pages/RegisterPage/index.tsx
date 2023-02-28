import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, ChangeAvatar, ChangeNickname } from 'common';
import { ROUTE, DEFAULT_IMAGE_URL, LOADING_IMAGE_URL } from 'common/constants';
import { postRegister } from 'services';
import { checkInputRefValid } from 'utils';

import {
  registerPageButtonStyle,
  registerPageButtonWrapperStyle,
  registerPageFormStyle,
  registerProfileInnerStyle,
} from './RegisterPage.styles';

export const RegisterPage = () => {
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE_URL);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const nav = useNavigate();

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault();
    if (checkInputRefValid(nicknameRef, 8)) return;
    if (!isValidated) return;
    if (imageUrl === LOADING_IMAGE_URL) return;
    await postRegister({ nickname: nicknameRef.current.value, avatar: imageUrl });
    nav(ROUTE.CHAT);
  }

  function handleClickCancel() {
    nav(ROUTE.LOGIN);
  }

  function handleChangeAvatar(newImageUrl: string) {
    setImageUrl(newImageUrl);
  }

  return (
    <form className={registerPageFormStyle} onSubmit={handleSubmitForm}>
      <ChangeAvatar imageUrl={imageUrl} onChange={handleChangeAvatar} className={registerProfileInnerStyle} />
      <ChangeNickname
        nicknameRef={nicknameRef}
        isValidated={isValidated}
        setIsValidated={setIsValidated}
        className={registerProfileInnerStyle}
      />
      <div className={registerPageButtonWrapperStyle}>
        <Button onClick={handleClickCancel} className={registerPageButtonStyle}>
          <span>취소</span>
        </Button>
        <Button isSubmit className={registerPageButtonStyle}>
          <span>가입</span>
        </Button>
      </div>
    </form>
  );
};
