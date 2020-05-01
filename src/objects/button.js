export class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text, targetScene) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.button = this.scene.add.sprite(0, 0, 'button').setInteractive();
    this.button.scaleX = 3;

    this.text = this.scene.make.text({
      x: 0,
      y: 0,
      text: text,
      style: {
        font: '28px monospace',
        fill: '#ffffff'
      }
    });

    Phaser.Display.Align.In.Center(this.text, this.button);
    this.add(this.button);
    this.add(this.text);

    this.button.on('pointerdown', function (pointer) {
      this.scene.scene.start(targetScene);
    }.bind(this));

    this.button.on('pointerover', function (pointer) {
      this.button.setTexture('buttonPressed');
    }.bind(this));

    this.button.on('pointerout', function (pointer) {
      this.button.setTexture('button');
    }.bind(this));

    this.scene.add.existing(this);
  }
}