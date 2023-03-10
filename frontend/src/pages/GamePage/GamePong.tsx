import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GameInstance, IonPhaser } from '@ion-phaser/react';
import { sockets, useGetCurrentGameRoom, useGetUser } from 'hooks';
import Phaser from 'phaser';

import { PlayerRoleType } from 'types/game';
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
  const currentGameRoom = useGetCurrentGameRoom();
  const nav = useNavigate();
  const { data: user } = useGetUser();

  const destroy = () => {
    gameRef.current?.destroy();
    setInitialize(false);
    setGame(null);
  };

  useEffect(() => {
    const mainScene = new MainScene();
    const playerRole: PlayerRoleType = {
      role: 'none',
    };

    if (currentGameRoom.host.user.id === user.id) {
      playerRole.role = 'host';
    } else if (currentGameRoom.challenger.user.id === user.id) {
      playerRole.role = 'challenger';
    } else {
      playerRole.role = 'spectator';
    }

    setGame({ ...gameConfig, scene: mainScene });
    mainScene.initHandlers();
    mainScene.hostCheckHandlers(playerRole.role);
    mainScene.gameModeCheckHandlers(currentGameRoom.mode);
    mainScene.naviHandlers(nav);

    return () => {
      sockets.gameSocket.removeListener('game_data');
      sockets.gameSocket.removeListener('update_score');
      destroy();
    };
  }, []);

  return <IonPhaser ref={gameRef} game={game} initialize={initialize} />;
};

export default GamePong;
