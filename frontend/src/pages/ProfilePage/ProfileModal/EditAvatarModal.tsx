import { putUserProfile } from 'services';
import { useRef } from 'react';
import { useGetCertainUser, useGetCurrentUser } from 'hooks';

import { tmpAvatarStyle } from './tmpAvatarStyle';

interface Props {
  onClickClose: () => void;
}

export const EditAvatarModal = ({ onClickClose }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const { refetch: getUserRefetch } = useGetCertainUser();
  const { refetch: getCurrentUserRefetch } = useGetCurrentUser();

  function handleSubmitProfile() {
    if (!inputRef.current.value) return;
    putUserProfile({ avatar: inputRef.current.value }).then(() => {
      getUserRefetch();
      getCurrentUserRefetch();
    });
    onClickClose();
  }

  function handleClickImage() {
    putUserProfile({ avatar: imageRef.current.src }).then(() => {
      getUserRefetch();
      getCurrentUserRefetch();
    });
    onClickClose();
  }

  return (
    <>
      <li>
        <label htmlFor="avatar">Edit Avatar</label>
        <br />
        <input type="text" id="avatar" placeholder="new Avatar URL" ref={inputRef} required />
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
// sample avatar further updates are needed
