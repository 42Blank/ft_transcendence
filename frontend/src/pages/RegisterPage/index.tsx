import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ChangeAvatar, ChangeNickname } from 'common';
import { ROUTE, DEFAULT_IMAGE_URL, LOADING_IMAGE_URL } from 'common/constants';
import { postRegister } from 'services';

import {
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
    if (
      !nicknameRef.current ||
      !nicknameRef.current.value ||
      nicknameRef.current.value.length === 0 ||
      nicknameRef.current.value.length > 8
    )
      return;
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
        <button type="button" onClick={handleClickCancel}>
          <span>취소</span>
        </button>
        <button type="submit">
          <span>가입</span>
        </button>
      </div>
    </form>
  );
};
