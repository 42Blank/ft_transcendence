import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  private ball: Phaser.Physics.Arcade.Image;
  private paddle1: Phaser.Physics.Arcade.Image;
  private paddle2: Phaser.Physics.Arcade.Image;

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
    this.ball = this.physics.add.image(100, 100, 'ball');
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
    this.ball.setVelocity(200, 200);

    this.paddle1 = this.physics.add.image(100, 300, 'peddal');
    this.paddle1.setImmovable(true);
    this.paddle2 = this.physics.add.image(700, 300, 'peddal');
    this.paddle2.setImmovable(true);

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
  }
}
