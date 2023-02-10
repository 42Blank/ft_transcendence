import { createRef, ReactNode, RefObject, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { modalBackgroundStyle, modalInnerStyle } from './Modal.styles';

interface Props {
  children: ReactNode;
  handleCloseModal: () => void;
}

export const Modal = ({ children, handleCloseModal }: Props) => {
  const modalRef: RefObject<HTMLDivElement> = createRef();
  const element = document.getElementById('modal') as Element;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!e?.target) return;
      if (modalRef.current && !modalRef.current.contains(e.target as HTMLDivElement)) handleCloseModal();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  return createPortal(
    <div className={modalBackgroundStyle}>
      <div className={modalInnerStyle} ref={modalRef}>
        {children}
      </div>
    </div>,
    element,
  );
};
