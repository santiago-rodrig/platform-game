import Phaser from 'phaser';

export default class RestartButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.button = this.scene.add.sprite(0, 0, 'button').setInteractive();
    this.button.scaleX = 5;

    this.text = this.scene.make.text({
      x: 0,
      y: 0,
      text,
      style: {
        font: '28px monospace',
        fill: '#222222',
      },
    });

    Phaser.Display.Align.In.Center(this.text, this.button);
    this.add(this.button);
    this.add(this.text);

    this.button.on('pointerdown', () => {
      this.scene.scene.restart();
      this.scene.restartGame();
    });

    this.button.on('pointerover', () => {
      this.button.setTexture('buttonPressed');
    });

    this.button.on('pointerout', () => {
      this.button.setTexture('button');
    });

    this.scene.add.existing(this);
  }
}
