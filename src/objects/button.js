import Phaser from 'phaser';

export default function (scene, x, y, text, targetScene) {
  const container = scene.add.container(x, y);
  const button = scene.add.sprite(0, 0, 'button').setInteractive();
  button.scaleX = 5;

  const textObject = scene.make.text({
    x: 0,
    y: 0,
    text,
    style: {
      font: '28px monospace',
      fill: '#222222',
    },
  });

  Phaser.Display.Align.In.Center(textObject, button);
  container.add([button, textObject]);

  button.on('pointerdown', () => {
    scene.scene.start(targetScene);
  });

  button.on('pointerover', () => {
    button.setTexture('buttonPressed');
  });

  button.on('pointerout', () => {
    button.setTexture('button');
  });

  scene.add.existing(container);
  return container;
}
