import { useRef, useState } from 'react';

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
  physics: { default: 'arcade', arcade: { gravity: { y: 0 } } },
};

const GamePong = () => {
  const gameRef = useRef<HTMLIonPhaserElement>(null);
  const [initialize] = useState(true);

  const { data: currentUser } = useGetUser();
  const currentGameRoom = useGetCurrentGameRoom();

  const isHost = currentUser.id === currentGameRoom.host.user.id;

  mainScene.initHandlers();
  mainScene.hostCheckHandlers(isHost);

  return <IonPhaser ref={gameRef} game={game} initialize={initialize} />;
};

export default GamePong;
