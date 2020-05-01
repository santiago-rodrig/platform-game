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

    this.musicCheckBox = this.add.image(200, 200, 'pixelArt', 666);

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
      // TODO
    });

    this.backButton = new Button(this, 400, 500, 'Back', 'TitleScene');
  }
}