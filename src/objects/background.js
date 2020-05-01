export class Background extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);
    this.scene = scene;
    this.x = 0;
    this.y = 0;
    this.backgroundImage = this.scene.add.image(0, 0, 'background');
    this.backgroundImage.setOrigin(0, 0);
    this.backgroundImage.displayWidth = this.scene.cameras.main.width;
    this.backgroundImage.displayHeight = this.backgroundImage.displayWidth;
    this.add(this.backgroundImage);
    this.scene.add.existing(this);
  }
}