import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  private pochita: Phaser.GameObjects.Image | null = null;
  private key: Phaser.Types.Input.Keyboard.CursorKeys | null = null;

  preload(): void {
    this.load.image('pochita', 'small_pochita.png');
  }

  create(): void {
    this.pochita = this.physics.add.sprite(400, 300, 'pochita');

    this.key = this.input.keyboard.createCursorKeys();
  }

  update(time: number, delta: number): void {
    if (this.pochita && this.key) {
      if (this.key.up.isDown) this.pochita.y -= 10;
      if (this.key.down.isDown) this.pochita.y += 10;
      if (this.key.left.isDown) this.pochita.x -= 10;
      if (this.key.right.isDown) this.pochita.x += 10;
    }
  }
}
