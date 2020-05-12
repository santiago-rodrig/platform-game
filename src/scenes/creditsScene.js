/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';
/* eslint-enable import/no-unresolved */

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('CreditsScene');
  }

  create() {
    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    this.sceneTitle = this.make.text({
      x: 0,
      y: 0,
      text: 'Credits',
      style: {
        font: '28px monospace',
        fill: '#ffffff',
      },
    });

    this.authorText = this.make.text({
      x: 0,
      y: 0,
      text: 'Created by Santiago Rodríguez',
      style: {
        font: '25px monospace',
        fill: '#ffffff',
      },
    });

    this.zone = this.add.zone(
      width / 2,
      height / 2,
      width,
      height,
    );

    Phaser.Display.Align.In.Center(
      this.sceneTitle,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.authorText,
      this.zone,
    );

    this.authorText.setY(1000);

    this.sceneTween = this.tweens.add({
      targets: this.sceneTitle,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
    });

    this.authorTween = this.tweens.add({
      targets: this.authorText,
      y: 300,
      ease: 'Power1',
      duration: 7000,
      delay: 1000,
      onComplete: () => {
        this.scene.start('TitleScene');
      },
      onCompleteScope: this,
    });
  }
}
