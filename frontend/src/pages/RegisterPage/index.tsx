import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTE } from 'common/constants';
import { postRegister } from 'services';

import {
  registerPageButtonWrapperStyle,
  registerPageFormStyle,
  registerPageInnerDivStyle,
  registerPageLogoImageStyle,
  registerPageNicknameCheckButtonStyle,
  registerPageWrapperStyle,
} from './RegisterPage.styles';

export const RegisterPage = () => {
  const nicknameRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  // const [isValidated, setIsValidated] = useState<boolean>(false);  // TODO: 닉네임 중복체크
  const nav = useNavigate();

  function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
    setImageUrl(URL.createObjectURL(e.currentTarget.files[0]));
  }

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault();
    if (!nicknameRef.current || !nicknameRef.current.value || nicknameRef.current.value.length === 0) return;
    await postRegister({ nickname: nicknameRef.current.value, avatar: 'https://bit.ly/3YMBEvR' });
    nav(ROUTE.CHAT);
  }

  function handleClickCancel() {
    nav(ROUTE.LOGIN);
  }

  return (
    <main className={registerPageWrapperStyle}>
      <img src="/logo.png" alt="pochitandence logo" width={280} height={80} className={registerPageLogoImageStyle} />
      <form className={registerPageFormStyle} onSubmit={handleSubmitForm}>
        <div className={registerPageInnerDivStyle}>
          <label htmlFor="register-image">프로필 사진</label>
          <input type="file" id="register-image" onChange={handleChangeImage} />
          {imageUrl && <img src={imageUrl} alt="register-selected" />}
        </div>
        <div className={registerPageInnerDivStyle}>
          <label htmlFor="register-nickname">닉네임</label>
          <input type="text" id="register-nickname" ref={nicknameRef} />
          <button type="button" className={registerPageNicknameCheckButtonStyle}>
            <span>중복체크</span>
          </button>
        </div>
        <div className={registerPageButtonWrapperStyle}>
          <button type="button" onClick={handleClickCancel}>
            <span>취소</span>
          </button>
          <button type="submit">
            <span>가입</span>
          </button>
        </div>
      </form>
    </main>
  );
};
