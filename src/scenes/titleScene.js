import { Button } from '../objects/button';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.add.image(width / 2, height / 2 - 212, 'background');

    if (!this.sys.game.globals.backgroundMusic) {
      this.sys.game.globals.backgroundMusic = this.sound.add(
        'backgroundMusic',
        { volume: 0.5, loop: true }
      );
    }

    if (this.sys.game.globals.music && !this.sys.game.globals.musicPlaying) {
      this.sys.game.globals.backgroundMusic.play();
      this.sys.game.globals.musicPlaying = true;
    }

    this.gameButton = new Button(this,
      width / 2,
      height / 2 - 100,
      'Play',
      'LevelOneScene'
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
      'Credits',
      'CreditsScene'
    );
  }
}
