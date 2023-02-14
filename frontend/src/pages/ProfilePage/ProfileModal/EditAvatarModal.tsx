import { putUserProfile } from 'services';
import { useRef } from 'react';
import { useGetCurrentUser } from 'hooks';

type PropType = {
  onClickClose: () => void;
};

export const EditAvatarModal = ({ onClickClose }: PropType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { refetch } = useGetCurrentUser();

  function handleSubmitProfile() {
    putUserProfile({ avatar: inputRef.current.value }).then(() => {
      refetch();
    });
    onClickClose();
  }

  return (
    <div>
      <label htmlFor="avatar">Edit Avatar</label>
      <br />
      <input type="text" id="avatar" placeholder="new Avatar URL" ref={inputRef} required />
      <br />
      <button type="button" onClick={handleSubmitProfile}>
        submit
      </button>
    </div>
  );
};
