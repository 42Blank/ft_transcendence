import { HamburgerIcon } from 'assets';
import { useRecoilValue } from 'recoil';
// import { useParams } from 'react-router-dom';

import { currentChatDataState, currentUserState } from 'store';
import { ChatElement } from './ChatElement';
import { ChatInput } from './ChatInput';

import { chatPageListWrapperStyle, chatPageTitleStyle, chatPageWrapperStyle } from './ChatPage.styles';

export const ChatPage = () => {
  // const { id } = useParams();
  const userInfo = useRecoilValue(currentUserState);
  const currentChatData = useRecoilValue(currentChatDataState);

  return (
    <main className={chatPageWrapperStyle}>
      <header className={chatPageTitleStyle}>
        <span>ycha 바보</span>
        <button type="button">
          <HamburgerIcon /> {/* TODO: 더 잘 어울리는 아이콘 있으면 그걸로 바꿀 예정 */}
        </button>
      </header>
      <ul className={chatPageListWrapperStyle}>
        {currentChatData.map(({ nickname, avatar, message, timestamp }, index) => (
          <ChatElement
            key={`${index}-${nickname}`}
            nickname={nickname}
            avatar={avatar}
            message={message}
            timestamp={timestamp}
            isMine={userInfo.nickname === nickname}
          />
        ))}
      </ul>
      <ChatInput />
    </main>
  );
};
