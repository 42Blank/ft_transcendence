import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  private ball: Phaser.Physics.Arcade.Image;
  private paddle1: Phaser.Physics.Arcade.Image;
  private paddle2: Phaser.Physics.Arcade.Image;

  private score1: number;
  private score1label: Phaser.GameObjects.Text;
  private score2: number;
  private score2label: Phaser.GameObjects.Text;

  private key: Phaser.Types.Input.Keyboard.CursorKeys;
  /**
   * CursorKeys: 지정된 일부 키보드 값만 받을 수 있음
   * - Up, Down, Right, Left, Shift, SpaceBar
   * */

  constructor() {
    super({ key: 'MainScene', active: true });
  }
  preload() {
    this.load.image('ball', '/ball.png');
    this.load.image('peddal', '/paddle.png');
  }

  create() {
    this.ball = this.physics.add.image(400, 300, 'ball');
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
    this.ball.setVelocity(200, 200);

    this.paddle1 = this.physics.add.image(100, 300, 'peddal');
    this.paddle1.setImmovable(true);
    this.paddle2 = this.physics.add.image(700, 300, 'peddal');
    this.paddle2.setImmovable(true);

    this.score1 = 0;
    this.score1label = this.add.text(200, 125, '0', { fontSize: '32px', fontFamily: 'Arial' }).setOrigin(0.5, 0.5);
    this.score2 = 0;
    this.score2label = this.add.text(600, 125, '0', { fontSize: '32px', fontFamily: 'Arial' }).setOrigin(0.5, 0.5);
    this.physics.add.collider(this.ball, this.paddle1, null, null, this);
    this.physics.add.collider(this.ball, this.paddle2, null, null, this);

    this.key = this.input.keyboard.createCursorKeys();
  }

  update(time: number, delta: number) {
    if (this.paddle1 && this.paddle2 && this.key) {
      if (this.key.up.isDown) this.paddle2.y -= 10;
      else if (this.key.down.isDown) this.paddle2.y += 10;
      if (this.key.shift.isDown) this.paddle1.y -= 10;
      else if (this.key.space.isDown) this.paddle1.y += 10;
    }
    /* Paddle 임시 충돌 판정 코드 */
    this.paddle1.y = Phaser.Math.Clamp(this.paddle1.y, 50, 550);
    this.paddle2.y = Phaser.Math.Clamp(this.paddle2.y, 50, 550);

    if (this.ball.x < 10) {
      this.score2 += 1;
      this.score2label.text = this.score2.toString();
      this.ball.setVisible(false);
      this.ball.setPosition(400, 300);
      this.ball.setVelocity(0, 0);
      this.time.delayedCall(1500, () => {
        this.ball.setVelocity(200, 200);
        this.ball.setVisible(true);
      });
    } else if (this.ball.x > 790) {
      this.score1 += 1;
      this.score1label.text = this.score1.toString();
      this.ball.setVisible(false);
      this.ball.setPosition(400, 300);
      this.ball.setVelocity(0, 0);
      this.time.delayedCall(1500, () => {
        this.ball.setVelocity(200, 200);
        this.ball.setVisible(true);
      });
    }
  }
}
