import React, { useState, useRef } from 'react';
import Phaser from 'phaser';
import { IonPhaser, GameInstance } from '@ion-phaser/react';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentGamePongState, newGamePingMessageState } from 'store';

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
  // Call `setInitialize` when you want to initialize your game! :)
  const [initialize] = useState(true);
  const setNewMessage = useSetRecoilState(newGamePingMessageState);
  const setGetMessage = useRecoilValue(currentGamePongState);

  mainScene.setHandlers((message: string) => setNewMessage(message));
  mainScene.setHandlers(() => setGetMessage);

  return <IonPhaser ref={gameRef} game={game} initialize={initialize} />;
};

export default GamePong;
