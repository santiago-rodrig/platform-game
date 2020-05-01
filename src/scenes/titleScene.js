import { Button } from '../objects/button';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.backgroundMusic = this.sound.add(
      'backgroundMusic',
      { volume: 0.5, loop: true }
    );

    this.backgroundMusic.play();

    this.gameButton = new Button(this,
      width / 2,
      height / 2 - 100,
      'Play',
      'GameScene'
    );

    this.optionsButton = new Button(this,
      width / 2,
      height / 2,
      'Options',
      'OptionsScene'
    );

    this.creditsButton = new Button(
      this,
      width / 2,
      height / 2 + 100,
      'Credits', 'CreditsScene'
    );
  }
}