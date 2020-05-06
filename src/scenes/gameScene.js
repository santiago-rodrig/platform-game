export class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.setBackground();
    this.setPlatforms();
    this.setPlayer();
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
    const height = this.cameras.main.height;

    this.player = this.physics.add.sprite(200, height / 2 + 120, 'player');
    this.player.setFrame(0);
    this.player.setGravityY(800);
    this.player.setVelocityX(200);
    this.player.setFrictionX(0);
    this.player.jumpsCount = 2;
    this.player.isJumping = false;

    this.player.jumpsAvailable = function () {
      return this.jumpsCount >= 1;
    }

    this.cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
      frameRate: 8,
      repeat: -1
    });

    this.platforms.forEach(function (platform) {
      this.setPlatformCollider(platform);
    }, this);
  }

  setPlatformCollider(platform) {
    platform.children.iterate(function (block) {
      this.physics.add.collider(this.player, block);
    }.bind(this));
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
      block.setVelocityX(-200);
      block.setImmovable(true);
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

    if (this.thereIsSpaceBetweenPlatforms(Phaser.Math.Between(165, 215))) {
      this.newPlatform = this.buildPlatform(
        832,
        400 + Phaser.Math.Between(-50, 50),
        Phaser.Math.Between(2, 5)
      );

      this.platforms.push(this.newPlatform);
      this.setPlatformCollider(this.newPlatform);
    }

    if (this.player.body.touching.down) {
      if (!this.player.anims.isPlaying) {
        this.player.anims.play('run');
      }
    } else {
      this.player.anims.stop();
    }

    if (this.cursors.up.isDown) {
      if (this.player.jumpsAvailable() && !this.player.isJumping) {
        this.player.setVelocityY(-400);
        this.player.setVelocityX(0);
        this.player.jumpsCount -= 1;
        this.player.isJumping = true;

        this.time.delayedCall(500, function () {
          this.player.isJumping = false;
        }.bind(this));
      }

      this.player.setFrame(1);
    } else if (this.player.body.touching.down) {
      this.player.jumpsCount = 2;
      this.player.setVelocityX(200);
      this.player.x = 200;
    }
  }
}
