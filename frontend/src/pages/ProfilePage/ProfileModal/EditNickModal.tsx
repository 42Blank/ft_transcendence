import { putUserProfile } from 'services';
import { useRef } from 'react';
import { useGetCertainUser, useGetCurrentUser } from 'hooks';

type PropType = {
  onClickClose: () => void;
};

export const EditNickModal = ({ onClickClose }: PropType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { refetch } = useGetCertainUser();
  const { refetch: refetch2 } = useGetCurrentUser();

  function handleSubmitProfile() {
    putUserProfile({ nickname: inputRef.current.value }).then(() => {
      refetch();
      refetch2();
    });
    onClickClose();
  }

  return (
    <div>
      <label htmlFor="nickname">Edit Nickname</label>
      <br />
      <input type="text" id="nickname" placeholder="new nickname" ref={inputRef} required />
      <br />
      <button type="button" onClick={handleSubmitProfile}>
        submit
      </button>
    </div>
  );
};
