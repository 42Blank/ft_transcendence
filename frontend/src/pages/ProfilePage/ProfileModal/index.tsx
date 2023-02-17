import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import { useGetUser } from 'hooks';
import { putUserProfile } from 'services';

import { tmpAvatarStyle } from './tmpAvatarStyle';

interface Props {
  onClickClose: () => void;
}

export const EditProfile = ({ onClickClose }: Props) => {
  const inputAvatarRef = useRef<HTMLInputElement>(null);
  const inputNickRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { userId } = useParams();
  const { data, refetch: getUserRefetch } = useGetUser(userId);

  function handleSubmitProfile() {
    inputAvatarRef.current.value &&
      putUserProfile({ avatar: inputAvatarRef.current.value }).then(() => {
        getUserRefetch();
      });
    inputNickRef.current.value &&
      putUserProfile({ nickname: inputNickRef.current.value }).then(() => {
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
      <li>
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
      </li>
      <li>
        <p>Sample Avatar</p>
        <button type="button" onClick={handleClickImage}>
          <img className={tmpAvatarStyle} src="/pochita_sample.png" alt="pochi" ref={imageRef} />
        </button>
      </li>
    </>
  );
};
