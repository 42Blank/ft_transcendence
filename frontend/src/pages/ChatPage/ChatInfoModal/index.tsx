// import { useState } from 'react';
import { RefObject } from 'react';

import { Modal } from 'common';
import { ChatRoomInfoType } from 'types/chat';
import { checkIsMyselfOperator } from 'utils';
import { useGetCurrentUser } from 'hooks';
import { ChatInfoModalHeader } from './ChatInfoModalHeader';

import { closeButtonStyle } from './ChatInfoModal.styles';

interface Props {
  chatInfo: ChatRoomInfoType;
  modalRef: RefObject<HTMLDivElement>;
  onClickClose: () => void;
}

export const ChatInfoModal = ({ chatInfo, modalRef, onClickClose }: Props) => {
  const { roomTitle, users, isPrivate } = chatInfo;
  const currentUser = useGetCurrentUser();
  // const [isEditMode, setIsEditMode] = useState(false);
  const isMeOperator = checkIsMyselfOperator(users, currentUser);

  return (
    <Modal modalRef={modalRef}>
      <ChatInfoModalHeader roomTitle={roomTitle} isMeOperator={isMeOperator} isPrivate={isPrivate} />
      <button type="button" onClick={onClickClose} className={closeButtonStyle}>
        닫기
      </button>
    </Modal>
  );
};
