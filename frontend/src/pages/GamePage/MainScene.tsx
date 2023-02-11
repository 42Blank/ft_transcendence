import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  private pochita: Phaser.Physics.Arcade.Image;
  private paddle1: Phaser.GameObjects.Rectangle;

  private key: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: 'MainScene', active: true });
  }
  preload() {
    this.load.image('pochita', '/small_pochita.png');
  }

  create() {
    /* this.physics.world.setBoundsCollision(false, false, false, false); */
    /*
    //paddle body가 왜 wolrd랑 충돌 판정 안남?
    //this.pochita = this.physics.add.image(400, 300, 'pochita');
    //this.pochita.body.setSize(200, 200);
    */
    this.paddle1 = this.add.rectangle(50, 250, 30, 100, 0xffffff, 1);
    this.physics.add.existing(this.paddle1, true);

    this.key = this.input.keyboard.createCursorKeys();
  }

  update(time: number, delta: number) {
    if (this.paddle1 && this.key) {
      if (this.key.up.isDown) this.paddle1.y -= 10;
      else if (this.key.down.isDown) this.paddle1.y += 10;
    }
    /* 임시 충돌 판정 코드 */
    this.paddle1.y = Phaser.Math.Clamp(this.paddle1.y, 50, 550);
  }
}
