import React, { useState, useRef } from 'react';
import Phaser from 'phaser';
import { IonPhaser, GameInstance } from '@ion-phaser/react';

import { MainScene } from './MainScene';

const game: GameInstance = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  scene: MainScene,
  physics: { default: 'arcade', arcade: { gravity: { y: 0 } } },
};

const GameExample = () => {
  const gameRef = useRef<HTMLIonPhaserElement>(null);
  // Call `setInitialize` when you want to initialize your game! :)
  const [initialize] = useState(true);

  return <IonPhaser ref={gameRef} game={game} initialize={initialize} />;
};

export default GameExample;
