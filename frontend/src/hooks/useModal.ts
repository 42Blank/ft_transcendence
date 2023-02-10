import { createRef, RefObject, useEffect, useState } from 'react';

export function useModal() {
  const modalRef: RefObject<HTMLDivElement> = createRef();
  const [isShown, setIsShown] = useState(false);

  function handleOpenModal() {
    setIsShown(true);
  }

  function handleCloseModal() {
    setIsShown(false);
  }

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

  return { modalRef, isShown, handleOpenModal, handleCloseModal };
}
