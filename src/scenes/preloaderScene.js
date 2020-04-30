export class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('PreloaderScene');
  }

  preload() {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 100,
      text: 'Initializing...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });

    assetText.setOrigin(0.5, 0.5);
    percentText.setOrigin(0.5, 0.5);
    loadingText.setOrigin(0.5, 0.5);
    progressBox.fillStyle(0x222222, 0.8);

    progressBox.fillRect(
      width / 2,
      height / 2,
      320,
      50
    );

    this.load.on('progress', function (value) {
      
    });
  }
}