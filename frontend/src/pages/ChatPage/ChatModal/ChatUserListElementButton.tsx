import { ReactNode, useState } from 'react';

import { Tooltip } from 'common';
import { chatUserButtonStyle } from './ChatUserListElement.styles';

interface Props {
  children: ReactNode;
  text: string;
}

export const ChatUserListElementButton = ({ children, text }: Props) => {
  const [isHover, setIsHover] = useState(false);
  function handleMouseOver() {
    setIsHover(true);
  }

  function handleMouseOut() {
    setIsHover(false);
  }

  return (
    <button
      type="button"
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}
      onMouseOut={handleMouseOut}
      onBlur={handleMouseOut}
      className={chatUserButtonStyle}
    >
      {children}
      {isHover && <Tooltip text={text} />}
    </button>
  );
};
