export class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.setBackground();
    this.setPlatforms();
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

  setPlatforms() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const firstPlatform = this.buildPlatform(32, height / 2 + 200, 10);

    this.platforms = [];
    this.platforms.push(firstPlatform);
  }

  thereIsSpaceBetweenPlatforms(minimumDistance) {
    const lastPlatform = this.platforms[this.platforms.length - 1];
    let lastBlock = lastPlatform.getChildren();
    lastBlock = lastBlock[lastBlock.length - 1];

    return lastBlock.x <= 800 - minimumDistance;
  }

  buildPlatform(positionX, positionY, blocksCount=1) {
    const platform = this.physics.add.staticGroup();
    let block;

    for (let i = 0, offsetX = positionX;
      i < blocksCount;
      i += 1, offsetX += 64
    ) {
      block = this.physics.add.sprite(offsetX, positionY, 'objects', 59);
      platform.add(block);
    }

    platform.children.iterate(function (block) {
      block.setVelocityX(-60);
    });

    return platform;
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

    this.platforms.forEach(function (platform, index) {
      const blocks = platform.getChildren();
      const lastBlock = blocks[blocks.length - 1];

      if (lastBlock.x <= 32) {
        this.platformToUpdate = index;
      }
    }.bind(this));

    if (this.platformToUpdate) {
      this.platforms = this.platforms.slice(
        0,
        this.platformToUpdate
      ).concat(
        this.platforms.slice(this.platformToUpdate + 1)
      );

      this.platformToUpdate = null;
    }

    if (this.thereIsSpaceBetweenPlatforms(152)) {
      this.platforms.push(this.buildPlatform(
        832,
        300 + Phaser.Math.Between(-100, 200),
        Phaser.Math.Between(2, 5)
      ));
    }
  }
}
