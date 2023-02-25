import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Phaser from 'phaser';
import { GameInstance, IonPhaser } from '@ion-phaser/react';

import { useRecoilValue } from 'recoil';
import { playerRoleState } from 'store/playerRoleState';
import { useGetCurrentGameRoom } from 'hooks';
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
  const playerRole = useRecoilValue(playerRoleState);
  const gameMode = useGetCurrentGameRoom().mode;
  const nav = useNavigate();

  useEffect(() => {
    mainScene.initHandlers();
    mainScene.hostCheckHandlers(playerRole.role);
    mainScene.gameModeCheckHandlers(gameMode);
    mainScene.naviHandlers(nav);
  }, []);

  return <IonPhaser ref={gameRef} game={game} initialize={initialize} />;
};

export default GamePong;
