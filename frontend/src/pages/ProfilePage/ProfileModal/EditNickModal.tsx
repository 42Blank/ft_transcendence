import { putUserProfile } from 'services';
import { useRef } from 'react';
import { useGetUser } from 'hooks';
import { useParams } from 'react-router-dom';

interface Props {
  onClickClose: () => void;
}

export const EditNickModal = ({ onClickClose }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { userId } = useParams();

  const { refetch: getUserRefetch } = useGetUser(userId);

  function handleSubmitProfile() {
    if (!inputRef.current.value) return;
    putUserProfile({ nickname: inputRef.current.value }).then(() => {
      getUserRefetch();
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
