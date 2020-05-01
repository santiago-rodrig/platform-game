export class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  create() {
    this.backgroundMusic = this.sound.add('backgroundMusic', {
      volume: 0.5, loop: true
    });
  }
}