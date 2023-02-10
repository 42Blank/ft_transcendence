import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
}

export const Modal = ({ children }: Props) => {
  const element = document.getElementById('modal') as Element;
  return createPortal(children, element);
};
