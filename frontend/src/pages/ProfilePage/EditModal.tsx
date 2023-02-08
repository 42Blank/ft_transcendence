import { useRef } from 'react';
import { EditForm } from './EditForm';

export const EditModal = () => {
  const modalRef = useRef<HTMLInputElement>(null);

  function displayEditModal(): void {
    modalRef.current.style.display = 'block';
  }

  function exitEditModal(): void {
    modalRef.current.style.display = 'none';
  }

  return (
    <div>
      <button type="button" onClick={displayEditModal}>
        Edit Profile
      </button>
      <div className="modal-test" ref={modalRef}>
        <div className="modal-test-content">
          <button type="button" className="close" onClick={exitEditModal}>
            &times;
          </button>
          <EditForm />
        </div>
      </div>
    </div>
  );
};
