import Phaser from 'phaser';
import { NavigateFunction } from 'react-router-dom';

import { GameData, GameRoomInfoType } from 'types/game';
import { sockets } from 'hooks';

const scoreFontStyle = { fontSize: '32px', fontFamily: 'Arial' };
export class MainScene extends Phaser.Scene {
  private isHost: Boolean;
  private navigate: NavigateFunction;

  private ball: Phaser.Physics.Arcade.Image;
  private paddleLeft: Phaser.Physics.Arcade.Image;
  private paddleRight: Phaser.Physics.Arcade.Image;

  private scoreLeft: number;
  private scoreLabelLeft: Phaser.GameObjects.Text;
  private scoreRight: number;
  private scoreLabelRight: Phaser.GameObjects.Text;

  private key: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: 'MainScene', active: true });
    this.events = new Phaser.Events.EventEmitter();
  }

  initHandlers() {
    sockets.gameSocket.on('game_data', this.gameDataHandler.bind(this));
    sockets.gameSocket.on('update_score', this.updateScoreHandler.bind(this));
    sockets.gameSocket.on('finish_game', this.finishGameHandler.bind(this));
    // this.events = new Phaser.Events.EventEmitter();
  }

  naviHandlers(navi: NavigateFunction) {
    this.navigate = navi;
  }

  hostCheckHandlers(isHostInput: boolean) {
    this.isHost = isHostInput;
  }

  initBall() {
    this.ball.setVisible(false);
    this.ball.setPosition(400, 300);
    this.ball.setVelocity(0, 0);
    this.ball.setVisible(true);
  }

  checkScore() {
    if (this.ball.x >= 10 && this.ball.x <= 790) return;

    if (this.isHost && this.ball.x < 10) {
      sockets.gameSocket.emit('update_score', { winner: 'challenger' });
    } else if (this.isHost && this.ball.x > 790) {
      sockets.gameSocket.emit('update_score', { winner: 'host' });
    }
    this.initBall();
  }

  preload() {
    this.load.image('ball', '/ball.png');
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

    this.scoreLeft = 0;
    this.scoreLabelLeft = this.add.text(200, 125, '0', scoreFontStyle).setOrigin(0.5, 0.5);
    this.scoreRight = 0;
    this.scoreLabelRight = this.add.text(600, 125, '0', scoreFontStyle).setOrigin(0.5, 0.5);

    /**
     * @param collideCallback 으로 패들 출돌 위치에 따라 velocity를 다르게 주면 되지 않을까?
     */
    this.physics.add.collider(this.ball, this.paddleLeft, null, null, this);
    this.physics.add.collider(this.ball, this.paddleRight, null, null, this);

    this.key = this.input.keyboard.createCursorKeys();

    this.initBall();
    this.time.delayedCall(1500, () => {
      this.ball.setVelocity(300, 150);
    });
    this.time.addEvent({
      delay: 100,
      callback: () => {
        if (this.isHost) {
          this.updateHostPos();
        } else if (!this.isHost) {
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

    if (this.isHost) {
      if (this.key.up.isDown) {
        this.paddleLeft.y -= 10;
      } else if (this.key.down.isDown) {
        this.paddleLeft.y += 10;
      }
    } else if (!this.isHost) {
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
    this.scoreLabelLeft.text = data.host.toString();
    this.scoreLabelRight.text = data.challenger.toString();

    this.initBall();
    this.time.delayedCall(1500, () => {
      this.ball.setVelocity(300, 150);
    });
  }
  finishGameHandler() {
    this.events.emit('gameFinished');
    this.ball.disableBody();
  }
  gameDataHandler(data: GameData) {
    if (!this.isHost && data.host) {
      this.paddleLeft.y = data.host.y;
    }
    if (this.isHost && data.challenger) {
      this.paddleRight.y = data.challenger.y;
    }

    if (!this.isHost) {
      if (data.ball) {
        this.ball.setPosition(data.ball.x, data.ball.y);
        this.ball.setVelocity(data.ball.velocityX, data.ball.velocityY);
      }
    }
  }
}
