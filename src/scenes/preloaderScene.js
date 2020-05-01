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
      y: height / 2 + 25,
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
    progressBox.setDepth(1);
    progressBar.setDepth(2);
    percentText.setDepth(3);

    progressBox.fillRect(
      width / 2 - 320 / 2,
      height / 2,
      320,
      50
    );

    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0x00ff00, 1);

      progressBar.fillRect(
        width / 2 - 300 / 2,
        height / 2 + 10,
        300 * value,
        30);
    });

    this.load.on('fileprogress', function (file) {
      assetText.setText(file.src);
    });

    this.load.on('complete', function() {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));

    this.time.delayedCall(2000, this.ready, [], this);
    this.load.audio('backgroundMusic', ['assets/backgroundMusic.mp3']);
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.readyCount += 1;

    if (this.readyCount === 2) this.scene.start('TitleScene');
  }
}