import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Phaser from 'phaser';
import { GameInstance, IonPhaser } from '@ion-phaser/react';

import { useGetCurrentGameRoom, useGetUser } from 'hooks';
import { MainScene } from './MainScene';

const mainScene = new MainScene();

const game: GameInstance = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  scene: mainScene,
  physics: { default: 'arcade', arcade: { gravity: { y: 0 }, fps: 60 } },
};

const GamePong = () => {
  const gameRef = useRef<HTMLIonPhaserElement>(null);
  const [initialize] = useState(true);

  const { data: currentUser } = useGetUser();
  const currentGameRoom = useGetCurrentGameRoom();
  const nav = useNavigate();

  useEffect(() => {
    const isHost = currentUser.id === currentGameRoom.host.user.id;

    mainScene.initHandlers();
    mainScene.hostCheckHandlers(isHost);
    mainScene.naviHandlers(nav);
  }, []);

  return <IonPhaser ref={gameRef} game={game} initialize={initialize} />;
};

export default GamePong;