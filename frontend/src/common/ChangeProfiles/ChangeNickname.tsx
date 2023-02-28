import { CheckIcon } from 'assets';
import { ChangeEvent } from 'react';
import { postUserCheckDuplicateNickname } from 'services';

import {
  changeNicknameWrapperStyle,
  changeProfileLabelStyle,
  changeProfileWrapperStyle,
} from './ChangeProfiles.styles';

interface Props {
  nickname: string;
  isValidated: boolean;
  onChange: (newNickname: string, isValidated: boolean) => void;
  className?: string;
}

export const ChangeNickname = ({ nickname, isValidated, onChange, className }: Props) => {
  function handleChangeNickname(e: ChangeEvent<HTMLInputElement>) {
    const newNickname = e.currentTarget.value;

    if (!newNickname || newNickname.length === 0) {
      onChange(newNickname, false);
      return;
    }

    postUserCheckDuplicateNickname({
      nickname: newNickname,
    }).then(res => {
      onChange(newNickname, !res);
    });
  }

  return (
    <div className={`${changeProfileWrapperStyle} ${className}`}>
      <label htmlFor="register-nickname" className={changeProfileLabelStyle}>
        닉네임
      </label>
      <div className={changeNicknameWrapperStyle}>
        <input type="text" id="register-nickname" maxLength={8} value={nickname} onChange={handleChangeNickname} />
        {isValidated && <CheckIcon />}
      </div>
    </div>
  );
};
