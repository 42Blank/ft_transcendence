import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  private pochita: Phaser.Physics.Arcade.Image;
  private key: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: 'MainScene', active: true, physics: { default: 'arcade' } });
  }
  preload() {
    this.load.image('pochita', 'small_pochita.png');
  }

  create() {
    console.log(this.physics);
    this.pochita = this.physics.add.image(400, 300, 'pochita');
    this.key = this.input.keyboard.createCursorKeys();
  }

  update(time: number, delta: number) {
    if (this.pochita && this.key) {
      if (this.key.up.isDown) this.pochita.y -= 10;
      if (this.key.down.isDown) this.pochita.y += 10;
      if (this.key.left.isDown) this.pochita.x -= 10;
      if (this.key.right.isDown) this.pochita.x += 10;
    }
  }
}
