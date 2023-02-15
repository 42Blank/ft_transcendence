import GamePong from './game';

export const GamePage = () => {
  return (
    <div>
      <GamePong />
      {/* 게임 설명 예시 */}
      <div>•BALL WILL SERVE AUTOMATICALLY</div>
      <div>•AVOID MISSING BALL FOR HIGH SCORE</div>
    </div>
  );
};
