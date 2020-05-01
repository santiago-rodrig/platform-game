export class Platform extends Phaser.GameObjects.Container {
  constructor(scene, x, y, count=1) {
    super(scene);
    this.scene = scene;
    this.x = 0;
    this.y = 0;

    for (let i = 0, offset = x; i < count; i += 1, offset += 64) {
      this.platform = this.scene.physics.add.sprite(offset, y, 'objects');
      this.platform.setFrame(6);
      this.platform.setOrigin(0, 0);
      this.add(this.platform);
      this.scene.add.existing(this);
    }
  }
}