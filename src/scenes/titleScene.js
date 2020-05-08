import { Button } from '../objects/button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.add.image(width / 2, height / 2, 'background');

    if (!this.sys.game.globals.backgroundMusic) {
      this.sys.game.globals.backgroundMusic = this.sound.add(
        'backgroundMusic',
        { volume: 0.25, loop: true }
      );
    }

    if (this.sys.game.globals.music && !this.sys.game.globals.musicPlaying) {
      this.sys.game.globals.backgroundMusic.play();
      this.sys.game.globals.musicPlaying = true;
    } else if (this.sys.game.globals.musicPlaying) {
      if (!this.sys.game.globals.backgroundMusic.isPlaying) {
        this.sys.game.globals.backgroundMusic.play()
      }
    }

    new Button(this,
      width / 2,
      height / 2 - 100,
      'Play',
      'GameScene'
    );

    new Button(this,
      width / 2,
      height / 2,
      'Options',
      'OptionsScene'
    );

    new Button(
      this,
      width / 2,
      height / 2 + 100,
      'Credits',
      'CreditsScene'
    );

    const leaderBoardButton = new Button(
      this,
      width / 2,
      height / 2 + 200,
      'Leader board',
      'LeaderBoardScene'
    );
  }
}
