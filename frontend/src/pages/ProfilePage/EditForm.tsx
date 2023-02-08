import { putUserProfile } from 'services';
import { useRef, Dispatch, SetStateAction } from 'react';

type PropType = {
  setVisible: Dispatch<SetStateAction<Boolean>>;
};

export const EditForm = ({ setVisible }: PropType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  function submitProfile() {
    putUserProfile({ nickname: inputRef.current.value });
    setVisible(false);
  }

  return (
    <div>
      <label htmlFor="nickname">Edit profile</label>
      <br />
      <input type="text" id="nickname" placeholder="new nickname" ref={inputRef} required />
      <br />
      <button type="button" onClick={submitProfile}>
        submit
      </button>
    </div>
  );
};
