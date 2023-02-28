import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, ChangeAvatar, ChangeNickname } from 'common';
import { ROUTE, DEFAULT_IMAGE_URL, LOADING_IMAGE_URL } from 'common/constants';
import { checkInputRefValid } from 'utils';
import { postRegister } from 'services';

import {
  registerPageButtonstyle,
  registerPageButtonWrapperStyle,
  registerPageFormStyle,
  registerProfileInnerStyle,
} from './RegisterPage.styles';

export const RegisterPage = () => {
  const nicknameRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE_URL);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const nav = useNavigate();

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault();
    if (!checkInputRefValid(nicknameRef, 8)) return;
    if (!isValidated) return;
    if (imageUrl === LOADING_IMAGE_URL) return;
    await postRegister({ nickname: nicknameRef.current.value, avatar: imageUrl });
    nav(ROUTE.CHAT);
  }

  function handleClickCancel() {
    nav(ROUTE.LOGIN);
  }

  return (
    <form className={registerPageFormStyle} onSubmit={handleSubmitForm}>
      <ChangeAvatar imageUrl={imageUrl} setImageUrl={setImageUrl} className={registerProfileInnerStyle} />
      <ChangeNickname
        isValidated={isValidated}
        setIsValidated={setIsValidated}
        nicknameRef={nicknameRef}
        className={registerProfileInnerStyle}
      />
      <div className={registerPageButtonWrapperStyle}>
        <Button onClick={handleClickCancel} className={registerPageButtonstyle}>
          <span>취소</span>
        </Button>
        <Button isSubmit className={registerPageButtonstyle}>
          <span>가입</span>
        </Button>
      </div>
    </form>
  );
};
