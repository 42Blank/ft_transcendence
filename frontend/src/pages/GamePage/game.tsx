import React, { useState, useRef } from 'react';
import Phaser from 'phaser';
import { IonPhaser, GameInstance } from '@ion-phaser/react';
import { MainScene } from './MainScene';

const game: GameInstance = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  scene: MainScene,
};

const GameExample = () => {
  const gameRef = useRef<HTMLIonPhaserElement>(null);
  // Call `setInitialize` when you want to initialize your game! :)
  const [initialize, setInitialize] = useState(true);
  const destroy = () => {
    if (gameRef.current) {
      gameRef.current.destroy();
    }
    setInitialize(false);
  };

  return (
    <>
      <IonPhaser ref={gameRef} game={game} initialize={initialize} />
      {/*<button onClick={() => setInitialize(true)}>Initialize</button>*/}
      {/*<button onClick={destroy}>Destroy</button>*/}
    </>
  );
};

export default GameExample;
