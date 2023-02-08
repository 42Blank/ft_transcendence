import { putUserProfile } from 'services';
import { useRef } from 'react';

export const EditForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  function submitProfile() {
    putUserProfile({ nickname: inputRef.current.value });
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
