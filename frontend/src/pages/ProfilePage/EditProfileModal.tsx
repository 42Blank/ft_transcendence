import { ChangeEvent, useRef, useState } from 'react';

import { putUserProfile, postUserCheckDuplicateNickname } from 'services';
import { UserInfoType } from 'types/user';

import { tmpAvatarStyle } from './tmpAvatarStyle';

interface Props {
  onClickClose: () => void;
  user: UserInfoType;
  refetch: () => void;
}

interface ProfileObj {
  nickname?: string;
  avatar?: string;
}

export const EditProfileModal = ({ onClickClose, user: data, refetch }: Props) => {
  const inputAvatarRef = useRef<HTMLInputElement>(null);
  const inputNickRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isValidated, setIsValidated] = useState<boolean>(false);

  function handleChangeNickname(e: ChangeEvent<HTMLInputElement>) {
    const nickname = e.currentTarget.value;

    if (!nickname || nickname.length === 0) {
      setIsValidated(false);
      return;
    }

    if (e.currentTarget.value !== data.nickname) {
      postUserCheckDuplicateNickname({
        nickname: e.currentTarget.value,
      }).then(res => {
        setIsValidated(!res);
      });
    }
  }

  function handleSubmitProfile() {
    const profileObj: ProfileObj = {};
    if (!isValidated) return;
    if (!inputAvatarRef.current.value && !inputNickRef.current.value) return;
    if (inputNickRef.current.value) profileObj.nickname = inputNickRef.current.value;
    if (inputAvatarRef.current.value) profileObj.avatar = inputAvatarRef.current.value;
    putUserProfile(profileObj).then(() => {
      refetch();
    });
    onClickClose();
  }

  function handleClickImage() {
    putUserProfile({ avatar: imageRef.current.src }).then(() => {
      inputAvatarRef.current.value = imageRef.current.src;
    });
  }

  return (
    <>
      <div>
        <label>Edit Profile</label>
        <br />
        <label htmlFor="nickname">Edit Nickname</label>
        <input
          type="text"
          id="nickname"
          defaultValue={data.nickname}
          placeholder="new nickname"
          ref={inputNickRef}
          required
          onChange={handleChangeNickname}
        />
        <input type="checkbox" checked={isValidated} readOnly />
        <br />
        <br />
        <label htmlFor="avatar">Edit Avatar</label>
        <input
          type="text"
          id="avatar"
          defaultValue={data.avatar}
          placeholder="new Avatar URL"
          ref={inputAvatarRef}
          required
        />
        <br />
        <button type="button" onClick={handleSubmitProfile}>
          submit
        </button>
      </div>
      <div>
        <p>Sample Avatar</p>
        <button type="button" onClick={handleClickImage}>
          <img
            className={tmpAvatarStyle}
            src="/pochita_sample.png"
            width={100}
            height={100}
            alt="pochi"
            ref={imageRef}
          />
        </button>
      </div>
    </>
  );
};
