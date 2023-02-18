import React, { useState, useRef } from 'react';
import Phaser from 'phaser';
import { IonPhaser, GameInstance } from '@ion-phaser/react';

import { sockets } from 'hooks/useHandleSocket';
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

  return <IonPhaser ref={gameRef} game={game} initialize={initialize} />;
};

export default GamePong;
