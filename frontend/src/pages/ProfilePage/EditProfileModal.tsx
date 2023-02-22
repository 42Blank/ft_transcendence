import { useRef } from 'react';

import { useGetUser } from 'hooks';
import { putUserProfile } from 'services';

import { tmpAvatarStyle } from './tmpAvatarStyle';

interface Props {
  onClickClose: () => void;
}

interface ProfileObj {
  nickname?: string;
  avatar?: string;
}

export const EditProfileModal = ({ onClickClose }: Props) => {
  const inputAvatarRef = useRef<HTMLInputElement>(null);
  const inputNickRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { data, refetch: getUserRefetch } = useGetUser();

  function handleSubmitProfile() {
    const profileObj: ProfileObj = {};
    if (!inputAvatarRef.current.value && !inputNickRef.current.value) return;
    if (inputNickRef.current.value) profileObj.nickname = inputNickRef.current.value;
    if (inputAvatarRef.current.value) profileObj.avatar = inputAvatarRef.current.value;
    putUserProfile(profileObj).then(() => {
      getUserRefetch();
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
        />
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
          <img className={tmpAvatarStyle} src="/pochita_sample.png" alt="pochi" ref={imageRef} />
        </button>
      </div>
    </>
  );
};
