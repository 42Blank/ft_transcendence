import { useParams, useNavigate } from 'react-router-dom';

import { ROUTE } from 'common/constants';
import { useGetMatchHistoryById } from 'hooks';

export const GameResultPage = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const { data } = useGetMatchHistoryById(Number(id));

  function handleClickLinkButton() {
    nav(ROUTE.GAME);
    window.location.reload();
  }
  return (
    <div>
      <h1>Result Page</h1>
      <h2>
        🏅{data.winner.nickname} 🆚 {data.loser.nickname}
      </h2>
      <button type="button" onClick={handleClickLinkButton}>
        <span>게임 메뉴로 돌아가기</span>
      </button>
    </div>
  );
};
