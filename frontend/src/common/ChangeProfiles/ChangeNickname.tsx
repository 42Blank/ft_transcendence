import { ChangeEvent, Dispatch, MutableRefObject, SetStateAction } from 'react';

import { Input } from 'common';
import { postUserCheckDuplicateNickname } from 'services';
import { CheckIcon } from 'assets';

import {
  changeNicknameWrapperStyle,
  changeProfileLabelStyle,
  changeProfileWrapperStyle,
} from './ChangeProfiles.styles';

interface Props {
  isValidated: boolean;
  setIsValidated: Dispatch<SetStateAction<boolean>>;
  nicknameRef: MutableRefObject<HTMLInputElement>;
  defaultNickname?: string;
  className?: string;
}

export const ChangeNickname = ({ isValidated, setIsValidated, nicknameRef, defaultNickname, className }: Props) => {
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

  return (
    <div className={`${changeProfileWrapperStyle} ${className ?? ''}`}>
      <label htmlFor="register-nickname" className={changeProfileLabelStyle}>
        닉네임
      </label>
      <div className={changeNicknameWrapperStyle}>
        <Input
          defaultValue={defaultNickname}
          placeholder="8글자 제한"
          id="register-nickname"
          inputRef={nicknameRef}
          onChange={handleChangeNickname}
        />
        {isValidated && <CheckIcon />}
      </div>
    </div>
  );
};
