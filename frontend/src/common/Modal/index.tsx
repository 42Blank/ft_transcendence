import { ReactNode, RefObject } from 'react';
import { createPortal } from 'react-dom';

import { modalBackgroundStyle, modalInnerStyle } from './Modal.styles';

interface Props {
  children: ReactNode;
  modalRef: RefObject<HTMLDivElement>;
}

export const Modal = ({ children, modalRef }: Props) => {
  const element = document.getElementById('modal') as Element;
  return createPortal(
    <div className={modalBackgroundStyle}>
      <div className={modalInnerStyle} ref={modalRef}>
        {children}
      </div>
    </div>,
    element,
  );
};
