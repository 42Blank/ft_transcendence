import 'phaser';
import { MainScene } from './MainScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [MainScene],
  physics: { default: 'arcade', arcade: { gravity: { y: 0 } } },
};

const game = new Phaser.Game(config);

const PhaserGame = () => {
  return <div id="MainScene" />;
};

export default PhaserGame;
