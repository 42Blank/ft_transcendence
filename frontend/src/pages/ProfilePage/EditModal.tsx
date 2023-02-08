import { useRef, Dispatch, SetStateAction } from 'react';
import { EditForm } from './EditForm';

type PropType = {
  setModal: Dispatch<SetStateAction<Boolean>>;
};

export const EditModal = ({ setModal }: PropType) => {
  const modalRef = useRef<HTMLInputElement>(null);

  function exitEditModal(): void {
    setModal(false);
  }

  return (
    <div>
      <div className="modal-test" ref={modalRef}>
        <div className="modal-test-content">
          <button type="button" className="close" onClick={exitEditModal}>
            &times;
          </button>
          <EditForm setVisible={setModal} />
        </div>
      </div>
    </div>
  );
};
