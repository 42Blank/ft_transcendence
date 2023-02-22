import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetCurrentGameRoom, useGetUser } from 'hooks';
import { useSetRecoilState } from 'recoil';
import { leaveGameRoomState } from 'store';

import Phaser from 'phaser';
import { GameInstance, IonPhaser } from '@ion-phaser/react';

import { MainScene } from './MainScene';

const mainScene = new MainScene();

const game: GameInstance = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  scene: mainScene,
  physics: { default: 'arcade', arcade: { gravity: { y: 0 } } },
};

export const GamePage = () => {
  const currentGameRoom = useGetCurrentGameRoom();
  const setLeaveGameRoom = useSetRecoilState(leaveGameRoomState);

  const gameRef = useRef<HTMLIonPhaserElement>(null);
  const [initialize] = useState(true);

  const { data: currentUser } = useGetUser();

  const isHost = currentUser.id === currentGameRoom.host.user.id;

  mainScene.initHandlers();
  mainScene.hostCheckHandlers(isHost);
  mainScene.naviHandlers(useNavigate());

  useEffect(() => {
    return () => {
      gameRef.current?.destroy();
      setLeaveGameRoom({ id: currentGameRoom.id });
    };
  }, []);

  return (
    <div>
      <IonPhaser ref={gameRef} game={game} initialize={initialize} />
      <div>• BALL WILL SERVE AUTOMATICALLY</div>
      <div>• AVOID MISSING BALL FOR HIGH SCORE</div>
    </div>
  );
};
