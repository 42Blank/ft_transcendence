import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import { useGetUser } from 'hooks';
import { putUserProfile } from 'services';

import { tmpAvatarStyle } from './tmpAvatarStyle';

interface Props {
  onClickClose: () => void;
}

export const EditAvatarModal = ({ onClickClose }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { userId } = useParams();

  const { refetch: getUserRefetch } = useGetUser(userId);

  function handleSubmitProfile() {
    if (!inputRef.current.value) return;
    putUserProfile(inputRef.current.value).then(() => {
      getUserRefetch();
    });
    onClickClose();
  }

  function handleClickImage() {
    putUserProfile(null, imageRef.current.src).then(() => {
      getUserRefetch();
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
