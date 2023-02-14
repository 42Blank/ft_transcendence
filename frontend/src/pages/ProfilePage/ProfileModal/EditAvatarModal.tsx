import { putUserProfile } from 'services';
import { useRef } from 'react';
import { useGetCurrentUser } from 'hooks';

import { tmpAvatarStyle } from './tmpAvatarStyle';

import pochi from './pochitaSample.png';

type PropType = {
  onClickClose: () => void;
};

export const EditAvatarModal = ({ onClickClose }: PropType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const { refetch } = useGetCurrentUser();

  function handleSubmitProfile() {
    putUserProfile({ avatar: inputRef.current.value }).then(() => {
      refetch();
    });
    onClickClose();
  }

  function handleClickImage() {
    putUserProfile({ avatar: imageRef.current.src }).then(() => {
      refetch();
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
          <img className={tmpAvatarStyle} src={pochi} alt="pochi" ref={imageRef} />
        </button>
      </li>
    </>
  );
};
// sample avatar further updates are needed
