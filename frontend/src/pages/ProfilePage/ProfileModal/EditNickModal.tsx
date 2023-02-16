import { putUserProfile } from 'services';
import { useRef } from 'react';
import { useGetCertainUser, useGetCurrentUser } from 'hooks';

interface Props {
  onClickClose: () => void;
}

export const EditNickModal = ({ onClickClose }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { refetch: getUserRefetch } = useGetCertainUser();
  const { refetch: getCurrentUserRefetch } = useGetCurrentUser();

  function handleSubmitProfile() {
    if (!inputRef.current.value) return;
    putUserProfile({ nickname: inputRef.current.value }).then(() => {
      getUserRefetch();
      getCurrentUserRefetch();
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
