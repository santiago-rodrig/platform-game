export class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.setBackground();
    this.setJewels();
    this.setObstacles();
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

  setObstacles() {
    this.obstacles = this.physics.add.group();
    this.obstaclesToRemove = [];
  }

  buildObstacle(height, platformLength) {
    const obstacle = this.physics.add.sprite(
      768 + Phaser.Math.Between(2, platformLength) * 64,
      height - 64,
      'objects',
      70
    );

    this.obstacles.add(obstacle);
    this.obstacles.getLast(true).setVelocityX(-200);
  }

  setJewels() {
    this.jewels = this.physics.add.group();
    this.jewelsToRemove = [];
  }

  buildJewel(positionX, positionY) {
    const jewel = this.physics.add.sprite(positionX, positionY, 'objects', 36);

    jewel.width = 40;
    jewel.height = 40;
    this.jewels.add(jewel);
    this.jewels.getLast(true).setVelocityX(-200);

    this.physics.add.overlap(
      this.player, this.jewels.getLast(true), this.collectJewel, null, this
    );
  }

  collectJewel(player, jewel) {
    jewel.destroy();
  }

  getJewelChance() {
    // 25% of chances to ge a jewel
    return Phaser.Math.Between(1, 100) <= 25;
  }

  setUI() {
  }

  setPlatforms() {
    this.platforms = [];

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const firstPlatform = this.buildPlatform(32, height / 2 + 200, 10);

    this.platforms.push(firstPlatform);
  }

  thereIsSpaceBetweenPlatforms(minimumDistance) {
    const lastPlatform = this.platforms[this.platforms.length - 1];
    let lastBlock = lastPlatform.getChildren();
    lastBlock = lastBlock[lastBlock.length - 1];

    return lastBlock.x <= 800 - minimumDistance;
  }

  getObstacleChance() {
    return Phaser.Math.Between(1, 100) <= 30;
  }

  buildPlatform(positionX, positionY, blocksCount=1) {
    const platform = this.physics.add.group();
    let block;

    for (let i = 0, offsetX = positionX;
      i < blocksCount;
      i += 1, offsetX += 64
    ) {
      block = this.physics.add.sprite(offsetX, positionY, 'objects', 59);
      platform.add(block);
    }

    if (this.platforms.length >= 1) {
      const platformWidth = blocksCount * 64;
      const midPoint = Math.round(platformWidth / 2);

      if (this.getJewelChance()) {
        this.buildJewel(800 + midPoint, positionY - 64);
      }

      if (this.getObstacleChance()) {
        this.buildObstacle(positionY, platform.getLength());
      }
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
        this.player.jumpsCount -= 1;
        this.player.isJumping = true;

        this.time.delayedCall(500, function () {
          this.player.isJumping = false;
        }.bind(this));
      }

      this.player.setFrame(1);
    } else if (this.player.body.touching.down) {
      this.player.jumpsCount = 2;
    }

    this.obstacles.children.iterate(function (obstacle) {
      if (obstacle.x <= -32) {
        this.obstaclesToRemove.push(obstacle);
      }
    }, this);

    this.obstaclesToRemove.forEach(function (obstacle) {
      this.obstacles.remove(obstacle, true, true);
    }, this);

    this.obstaclesToRemove = [];

    this.jewels.children.iterate(function (jewel) {
      if (jewel.x <= -32) {
        this.jewelsToRemove.push(jewel);
      }
    }.bind(this));

    this.jewelsToRemove.forEach(function (jewel) {
      this.jewels.remove(jewel, true, true);
    }, this);

    this.jewelsToRemove = [];
  }
}
