import { Button } from "../objects/button";

export class OptionsScene extends Phaser.Scene {
  constructor() {
    super('OptionsScene');
  }

  create() {
    this.SceneTitle = this.make.text({
      x: 300,
      y: 100,
      text: 'Options',
      style: {
        font: '40px monospace',
        fill: '#ffffff'
      }
    });

    if (this.sys.game.globals.music) {
      this.musicCheckBox = this.add.image(200, 200, 'pixelArt', 696);
    } else {
      this.musicCheckBox = this.add.image(200, 200, 'pixelArt', 666);
    }

    this.musicLabel = this.make.text({
      x: 250,
      y: 190,
      text: 'Music',
      style: {
        font: '24px monospace',
        fill: '#ffffff'
      }
    });

    this.musicLabel.setOrigin(0.3, 0.25);
    this.musicCheckBox.setInteractive();

    this.musicCheckBox.on('pointerdown', function () {
      this.sys.game.globals.music = !this.sys.game.globals.music;
      this.sys.game.globals.musicPlaying = !this.sys.game.globals.musicPlaying;

      if (!this.sys.game.globals.music) {
        this.sys.game.globals.backgroundMusic.stop();
        this.musicCheckBox.setTexture('pixelArt', 666);
      } else {
        this.sys.game.globals.backgroundMusic.play();
        this.musicCheckBox.setTexture('pixelArt', 696);
      }
    }.bind(this));

    this.backButton = new Button(this, 400, 500, 'Back', 'TitleScene');
  }
}