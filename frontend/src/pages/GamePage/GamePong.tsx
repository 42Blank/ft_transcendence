import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Phaser from 'phaser';
import { GameInstance, IonPhaser } from '@ion-phaser/react';
import { sockets } from 'hooks';

import { useRecoilValue } from 'recoil';
import { playerRoleState } from 'store/playerRoleState';
import { MainScene } from './MainScene';

const gameConfig: GameInstance = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  physics: { default: 'arcade', arcade: { gravity: { y: 0 }, fps: 60 } },
};

const GamePong = () => {
  const [game, setGame] = useState<GameInstance>();
  const [initialize, setInitialize] = useState(true);
  const gameRef = useRef<HTMLIonPhaserElement>(null);
  const playerRole = useRecoilValue(playerRoleState);
  const nav = useNavigate();

  const destroy = () => {
    gameRef.current?.destroy();
    setInitialize(false);
    setGame(null);
  };

  useEffect(() => {
    const mainScene = new MainScene();

    setGame({ ...gameConfig, scene: mainScene });
    mainScene.initHandlers();
    mainScene.hostCheckHandlers(playerRole.role);
    mainScene.naviHandlers(nav);
    // mainScene.initGame();

    return () => {
      sockets.gameSocket.removeListener('game_data');
      sockets.gameSocket.removeListener('update_score');
      destroy();
    };
  }, []);

  return <IonPhaser ref={gameRef} game={game} initialize={initialize} />;
};

export default GamePong;
