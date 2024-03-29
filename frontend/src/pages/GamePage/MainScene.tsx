import Phaser from 'phaser';
import { NavigateFunction } from 'react-router-dom';

import { sockets } from 'hooks';
import { GameData, GameRoomInfoType, PlayerRoleType } from 'types/game';

const scoreFontStyle = { fontSize: '32px', fontFamily: 'Arial' };

export class MainScene extends Phaser.Scene {
  private playerRole: PlayerRoleType['role'];
  private gameMode: GameRoomInfoType['mode'];
  private navigate: NavigateFunction;

  private ball: Phaser.Physics.Arcade.Image;
  private paddleLeft: Phaser.Physics.Arcade.Image;
  private paddleRight: Phaser.Physics.Arcade.Image;

  private scoreLabelLeft: Phaser.GameObjects.Text;
  private scoreLabelRight: Phaser.GameObjects.Text;

  private key: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: 'MainScene', active: true });
    this.events = new Phaser.Events.EventEmitter();
  }

  initHandlers() {
    sockets.gameSocket.on('game_data', this.gameDataHandler.bind(this));
    sockets.gameSocket.on('update_score', this.updateScoreHandler.bind(this));
  }

  naviHandlers(navi: NavigateFunction) {
    this.navigate = navi;
  }

  hostCheckHandlers(role: PlayerRoleType['role']) {
    this.playerRole = role;
  }
  gameModeCheckHandlers(mode: GameRoomInfoType['mode']) {
    this.gameMode = mode;
  }

  initBall() {
    this.ball.setVisible(false);
    this.ball.setPosition(400, 300);
    this.ball.setVelocity(0, 0);
    this.ball.setVisible(true);
  }

  checkScore() {
    if (this.ball.x >= 10 && this.ball.x <= 790) return;

    if (this.playerRole === 'host' && this.ball.x < 10) {
      sockets.gameSocket.emit('update_score', { winner: 'challenger' });
    } else if (this.playerRole === 'host' && this.ball.x > 790) {
      sockets.gameSocket.emit('update_score', { winner: 'host' });
    }
    this.initBall();
    this.time.delayedCall(1500, () => {
      this.ball.setVelocity(300, 150);
    });
  }

  preload() {
    if (this.gameMode === 'red') {
      this.load.image('ball', '/ball_red.png');
    } else {
      this.load.image('ball', '/ball.png');
    }

    this.load.image('peddal', '/paddle.png');
  }

  create() {
    this.ball = this.physics.add.image(400, 300, 'ball');
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
    this.ball.setVelocity(0, 0);

    this.paddleLeft = this.physics.add.image(100, 300, 'peddal');
    this.paddleLeft.setImmovable(true);

    this.paddleRight = this.physics.add.image(700, 300, 'peddal');
    this.paddleRight.setImmovable(true);

    this.scoreLabelLeft = this.add.text(200, 125, '?', scoreFontStyle).setOrigin(0.5, 0.5);
    this.scoreLabelRight = this.add.text(600, 125, '?', scoreFontStyle).setOrigin(0.5, 0.5);

    /**
     * @param collideCallback 으로 패들 출돌 위치에 따라 velocity를 다르게 주면 되지 않을까?
     */
    this.physics.add.collider(this.ball, this.paddleLeft, null, null, this);
    this.physics.add.collider(this.ball, this.paddleRight, null, null, this);

    this.key = this.input.keyboard.createCursorKeys();

    this.initBall();
    this.initGame();
  }

  initGame() {
    sockets.gameSocket.emit('update_score', {});

    if (!this.playerRole) {
      throw new Error('please set playerRole!!');
    }
    if (this.playerRole === 'spectator') {
      return;
    }
    if (this.playerRole === 'host') {
      this.time.delayedCall(1500, () => {
        this.ball.setVelocity(300, 150);
      });
    }

    this.time.addEvent({
      delay: 100,
      callback: () => {
        if (this.playerRole === 'host') {
          this.updateHostPos();
        } else if (this.playerRole === 'challenger') {
          this.updateChalPos();
        }
      },
      loop: true,
    });
  }

  updateHostPos() {
    sockets.gameSocket.emit('update_position', {
      paddleY: this.paddleLeft.y, //
      ball: {
        x: this.ball.x,
        y: this.ball.y,
        velocityX: this.ball.body.velocity.x,
        velocityY: this.ball.body.velocity.y,
      },
    });
  }
  updateChalPos() {
    sockets.gameSocket.emit('update_position', {
      paddleY: this.paddleRight.y, //
    });
  }
  update(time: number, delta: number) {
    // save paddle position
    // const oldPaddleLeftY = this.paddleLeft.y;
    // const oldPaddleRightY = this.paddleRight.y;

    if (!this.paddleLeft || !this.paddleRight || !this.key) return;

    if (this.playerRole === 'host') {
      if (this.key.up.isDown) {
        this.paddleLeft.y -= 10;
      } else if (this.key.down.isDown) {
        this.paddleLeft.y += 10;
      }
    } else if (this.playerRole === 'challenger') {
      if (this.key.up.isDown) {
        this.paddleRight.y -= 10;
      } else if (this.key.down.isDown) {
        this.paddleRight.y += 10;
      }
    }

    /* Paddle 임시 충돌 판정 코드 */
    this.paddleLeft.y = Phaser.Math.Clamp(this.paddleLeft.y, 50, 550);
    this.paddleRight.y = Phaser.Math.Clamp(this.paddleRight.y, 50, 550);

    this.checkScore();

    // restore paddle position
    // this.paddleLeft.y = oldPaddleLeftY;
    // this.paddleRight.y = oldPaddleRightY;
  }

  updateScoreHandler(data: GameRoomInfoType['score']) {
    if (this.scoreLabelLeft) {
      this.scoreLabelLeft.text = data.host.toString();
    }

    if (this.scoreLabelRight) {
      this.scoreLabelRight.text = data.challenger.toString();
    }
  }

  gameDataHandler(data: GameData) {
    if ((this.playerRole === 'challenger' || this.playerRole === 'spectator') && data.host && this.paddleLeft) {
      this.paddleLeft.y = data.host.y;
    }
    if ((this.playerRole === 'host' || this.playerRole === 'spectator') && data.challenger && this.paddleRight) {
      this.paddleRight.y = data.challenger.y;
    }

    if (this.playerRole !== 'host') {
      if (data.ball && this.ball) {
        this.ball.setPosition(data.ball.x, data.ball.y);
        this.ball.setVelocity(data.ball.velocityX, data.ball.velocityY);
      }
    }
  }
}
