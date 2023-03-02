import { useParams, useNavigate } from 'react-router-dom';

import { ROUTE } from 'common/constants';
import { Button } from 'common';
import { useGetMatchHistoryById } from 'hooks';
import { FightIcon } from 'assets';
import { MatchHistoryUserBox } from 'pages/ProfilePage/MatchHistoryList/MatchHistoryUserBox';
import {
  gameResultButtonWrapper,
  gameResultMatchWrapper,
  gameResultPageMatchPointLoseWrapper,
  gameResultPageMatchPointWinWrapper,
  gameResultPageWrapper,
  gameResultPointStyle,
} from './GameResultPage.style';

export const GameResultPage = () => {
  const { id } = useParams();
  const { data } = useGetMatchHistoryById(Number(id));
  const nav = useNavigate();

  function handleClickLinkButton() {
    nav(ROUTE.GAME);
    window.location.reload();
  }
  return (
    <div className={gameResultPageWrapper}>
      <div className={gameResultMatchWrapper}>
        <MatchHistoryUserBox user={data.winner} isWon />
        <FightIcon />
        <MatchHistoryUserBox user={data.loser} isRight />
      </div>
      <div className={gameResultMatchWrapper}>
        <span className={gameResultPageMatchPointWinWrapper}>+3</span>
        <span className={gameResultPointStyle}>Point</span>
        <span className={gameResultPageMatchPointLoseWrapper}>-1</span>
      </div>
      <Button onClick={handleClickLinkButton} className={gameResultButtonWrapper}>
        <span>게임 메뉴로 돌아가기</span>
      </Button>
    </div>
  );
};
