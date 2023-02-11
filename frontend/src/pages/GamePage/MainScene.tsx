import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  private pochita: Phaser.Physics.Arcade.Image;
  private ball: Phaser.Physics.Arcade.Image;
  private paddle1: Phaser.Physics.Arcade.Image;
  private paddle2: Phaser.Physics.Arcade.Image;

  private key: Phaser.Types.Input.Keyboard.CursorKeys;
  /* private key: Phaser.Input.Keyboard.Key; */

  constructor() {
    super({ key: 'MainScene', active: true });
  }
  preload() {
    this.load.image('pochita', '/small_pochita.png');
    this.load.image('peddal', '/icon.png');
  }

  create() {
    /* this.physics.world.setBoundsCollision(false, false, false, false); */
    /*
    //paddle body가 왜 wolrd랑 충돌 판정 안남?
    //this.pochita = this.physics.add.image(400, 300, 'pochita');
    //this.pochita.body.setSize(200, 200);
    */

    this.ball = this.physics.add.image(100, 100, 'pochita');
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
    this.ball.setVelocity(200, 200);

    /* this.paddle1 = this.add.rectangle(50, 250, 30, 100, 0xffffff, 1); */
    this.paddle1 = this.physics.add.image(100, 300, 'peddal');
    this.paddle1.setImmovable(true);
    this.paddle2 = this.physics.add.image(700, 300, 'peddal');
    this.paddle2.setImmovable(true);

    this.physics.add.collider(this.ball, this.paddle1, null, null, this);
    this.physics.add.collider(this.ball, this.paddle2, null, null, this);

    this.key = this.input.keyboard.createCursorKeys();
  }

  update(time: number, delta: number) {
    if (this.paddle1 && this.key) {
      if (this.key.up.isDown) this.paddle1.y -= 10;
      else if (this.key.down.isDown) this.paddle1.y += 10;
      if (this.key.shift.isDown) this.paddle2.y -= 10;
      else if (this.key.space.isDown) this.paddle2.y += 10;
    }
    /* Paddle 임시 충돌 판정 코드 */
    this.paddle1.y = Phaser.Math.Clamp(this.paddle1.y, 50, 550);
    this.paddle2.y = Phaser.Math.Clamp(this.paddle2.y, 50, 550);
  }
}
