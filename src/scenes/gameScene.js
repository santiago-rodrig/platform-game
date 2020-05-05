export class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    // const width = this.cameras.main.width;
    // const height = this.cameras.main.height;

    // const backgroundOne = this.add.image(width / 2, height / 2, 'background');
    this.setBackground();
  }

  setBackground() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const backgroundOne = this.add.image(width / 2, height / 2, 'background');

    const backgroundTwo = this.add.image(
      width / 2 + 1024, height / 2, 'background'
    );

    this.physics.add.existing(backgroundOne);
    this.physics.add.existing(backgroundTwo);
    this.backgroundsGroup = this.physics.add.group();
    this.backgroundsGroup.add(backgroundOne);
    this.backgroundsGroup.add(backgroundTwo);

    this.backgroundsGroup.getChildren().forEach(function (background) {
      background.body.setVelocityX(-40);
    });
  }

  setPlayer() {
  }

  setJewels() {
  }

  setUI() {
  }

  update() {
    this.backgroundsGroup.getChildren().forEach(function (background) {
      if (background.x <= -512) {
        const firstBackground = this.backgroundsGroup.children.entries[0];
        const lastBackground = this.backgroundsGroup.children.entries[1];

        if (firstBackground === background) {
          background.x = lastBackground.x + 1024; 
        } else {
          background.x = firstBackground.x + 1024;
        }
      }
    }.bind(this));
  }
}
