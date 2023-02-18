import { ChangeEvent, FormEvent, useRef, useState } from 'react';

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

  function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
    setImageUrl(URL.createObjectURL(e.currentTarget.files[0]));
  }

  function handleSubmitForm(e: FormEvent) {
    e.preventDefault();
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
          <button type="button">
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
