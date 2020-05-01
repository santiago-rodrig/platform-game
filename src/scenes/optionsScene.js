import { Button } from "../objects/button";
import { Background } from '../objects/background';

export class OptionsScene extends Phaser.Scene {
  constructor() {
    super('OptionsScene');
  }

  create() {
    new Background(this);

    this.SceneTitle = this.make.text({
      x: 300,
      y: 100,
      text: 'Options',
      style: {
        font: '40px monospace',
        fill: '#222222'
      }
    });

    if (!this.sys.game.globals.music) {
      this.musicCheckBox = this.add.image(200, 200, 'ui', 159);
    } else {
      this.musicCheckBox = this.add.image(200, 200, 'ui', 189);
    }

    this.musicLabel = this.make.text({
      x: 250,
      y: 190,
      text: 'Music',
      style: {
        font: '24px monospace',
        fill: '#222222'
      }
    });

    this.musicLabel.setOrigin(0.3, 0.25);
    this.musicCheckBox.setInteractive();
    this.musicCheckBox.setScale(2);

    this.musicCheckBox.on('pointerdown', function () {
      this.sys.game.globals.music = !this.sys.game.globals.music;
      this.sys.game.globals.musicPlaying = !this.sys.game.globals.musicPlaying;

      if (!this.sys.game.globals.music) {
        this.sys.game.globals.backgroundMusic.stop();
        this.musicCheckBox.setTexture('ui', 159);
      } else {
        this.sys.game.globals.backgroundMusic.play();
        this.musicCheckBox.setTexture('ui', 189);
      }
    }.bind(this));

    this.backButton = new Button(this, 400, 500, 'Back', 'TitleScene');
  }
}