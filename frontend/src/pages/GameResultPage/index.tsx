import { useNavigate } from 'react-router-dom';

import { ROUTE } from 'common/constants';

export const GameResultPage = () => {
  const navigate = useNavigate();

  function handleClickLinkButton() {
    navigate(ROUTE.GAME);
    window.location.reload();
  }
  return (
    <div>
      <h1>Result Page</h1>
      <h4>Player VS Player</h4>
      <h4>5 VS 3</h4>
      <button type="button" onClick={handleClickLinkButton}>
        <span>게임 메뉴로 돌아가기</span>
      </button>
    </div>
  );
};
