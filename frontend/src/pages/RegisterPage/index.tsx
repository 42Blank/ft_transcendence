import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTE } from 'common/constants';
import { postFile, postRegister, postUserCheckDuplicateNickname } from 'services';

import {
  registerPageButtonWrapperStyle,
  registerPageFormStyle,
  registerPageInnerDivStyle,
  registerPageLogoImageStyle,
  registerPageWrapperStyle,
} from './RegisterPage.styles';

const DEFAULT_IMAGE_URL = 'https://bit.ly/3YMBEvR';
const LOADING_IMAGE_URL = 'https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif';

export const RegisterPage = () => {
  const nicknameRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE_URL);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const nav = useNavigate();

  function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
    setImageUrl(LOADING_IMAGE_URL);
    postFile({ file: e.currentTarget.files[0] }).then(res => {
      setImageUrl(`${process.env.REACT_APP_SERVER}/file/${res}`);
    });
  }

  function handleChangeNickname(e: ChangeEvent<HTMLInputElement>) {
    const nickname = e.currentTarget.value;

    if (!nickname || nickname.length === 0) {
      setIsValidated(false);
      return;
    }

    postUserCheckDuplicateNickname({
      nickname: e.currentTarget.value,
    }).then(res => {
      setIsValidated(!res);
    });
  }

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault();
    if (!nicknameRef.current || !nicknameRef.current.value || nicknameRef.current.value.length === 0) return;
    if (!isValidated) return;
    if (imageUrl === LOADING_IMAGE_URL) return;
    await postRegister({ nickname: nicknameRef.current.value, avatar: imageUrl });
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
          <img src={imageUrl} alt="register-selected" />
        </div>
        <div className={registerPageInnerDivStyle}>
          <label htmlFor="register-nickname">닉네임</label>
          <input type="text" id="register-nickname" ref={nicknameRef} onChange={handleChangeNickname} />
          <input type="checkbox" checked={isValidated} readOnly />
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
