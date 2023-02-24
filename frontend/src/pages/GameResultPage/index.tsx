import { useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { finishedGameState } from 'store';
import { ROUTE } from 'common/constants';

export const GameResultPage = () => {
  const nav = useNavigate();
  const finishedGame = useRecoilValue(finishedGameState);

  function handleClickLinkButton() {
    nav(ROUTE.GAME);
    window.location.reload();
  }
  return (
    <div>
      <h1>Result Page</h1>
      <h2>
        🏅{finishedGame.winner.nickname} 🆚 {finishedGame.loser.nickname}
      </h2>
      <button type="button" onClick={handleClickLinkButton}>
        <span>게임 메뉴로 돌아가기</span>
      </button>
    </div>
  );
};
