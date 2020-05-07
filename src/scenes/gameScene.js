import { RestartButton } from '../objects/restartButton';
import { Button } from '../objects/button';

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
    this.setDifficulty();
    this.setUI();
  }

  updatePlayer() {
    this.player.setGravityY(this.sys.game.globals.playerGravity);
  }

  setDifficulty() {
    this.time.delayedCall(
      60000,
      function () {
        this.sys.game.globals.gameSpeed += 100;
        this.sys.game.globals.jewelChance += 10;
        this.sys.game.globals.obstacleChance += 20;
        this.sys.game.globals.playerGravity += 150;
        this.updatePlayer();
      },
      null,
      this
    );

    this.time.delayedCall(
      120000,
      function () {
        this.sys.game.globals.gameSpeed += 100;
        this.sys.game.globals.jewelChance += 10;
        this.sys.game.globals.obstacleChance += 20;
        this.sys.game.globals.playerGravity += 100;
        this.sys.game.globals.playerGravity += 150;
        this.updatePlayer();
      },
      null,
      this
    );
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
    this.player.setGravityY(this.sys.game.globals.playerGravity);
    this.player.jumpsCount = 2;
    this.player.setSize(54, 96);
    this.player.isJumping = false;
    this.playerScore = 0;

    this.player.jumpsAvailable = function () {
      return this.jumpsCount >= 1;
    }

    this.cursors = this.input.keyboard.createCursorKeys();

    this.footstepSound = this.sound.add('footstep', {
      volume: 0.75,
      loop: true,
      rate: 0.5
    });

    this.jumpSound = this.sound.add('jump', {
      volume: 0.75,
      loop: false
    });

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
      frameRate: 8,
      repeat: -1
    });

    this.platforms.forEach(function (platform) {
      this.setPlatformCollider(platform);
    }, this);

    this.scoreIncrementTimer = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: function () {
        this.playerScore += this.sys.game.globals.scoreRate;
        this.scoreText.setText('SCORE: ' + this.playerScore);
      },
      callbackScope: this
    });
  }

  setPlatformCollider(platform) {
    platform.children.iterate(function (block) {
      this.physics.add.collider(this.player, block);
    }.bind(this));
  }

  setObstacles() {
    this.obstacles = this.physics.add.group();
    this.obstaclesToRemove = [];

    this.gameOverSound = this.sound.add('gameOver', {
      volume: 1,
      loop: false
    });
  }

  buildObstacle(height, platformLength) {
    const obstacle = this.physics.add.sprite(
      768 + Phaser.Math.Between(2, platformLength) * 64,
      height - 64,
      'objects',
      70
    );

    this.obstacles.add(obstacle);

    this.obstacles.getLast(true).setVelocityX(
      this.sys.game.globals.gameSpeed * -1
    );

    this.obstacles.getLast(true).setSize(30, 10);

    this.physics.add.overlap(
      this.player, this.obstacles.getLast(true), this.gameOver, null, this
    );
  }

  init() {
    this.restartGame();
  }

  restartGame() {
    this.gameIsOver = false;
    this.sys.game.globals.gameSpeed = 200;
    this.sys.game.globals.jewelChance = 25;
    this.sys.game.globals.obstacleChance = 30;
    this.sys.game.globals.playerScore = 0;
    this.sys.game.globals.playerGravity = 1000;
    this.sys.game.globals.scoreRate = 10;
    this.sys.game.globals.jewelFrame = 36;
    this.sys.game.globals.jewelScore = 50;
    
    if (this.sys.game.globals.musicPlaying) {
      this.sys.game.globals.backgroundMusic.play();
    }
  }

  gameOver(player, obstacle) {
    this.physics.world.pause();
    this.gameIsOver = true;
    this.sound.stopAll();
    this.scoreIncrementTimer.remove();
    this.gameOverSound.play();
    player.setTint(0xff0000);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const curtain = this.add.graphics();

    const gameOverText = this.add.text(
      width / 2,
      height / 2,
      'GAME OVER',
      { font: '30px monospace', fill: '#ffffff' }
    );

    curtain.fillStyle(0x222222, 0.8);
    curtain.fillRect(0, 0, width, height);
    gameOverText.setOrigin(0.5, 0.5);

    new RestartButton(
      this,
      width / 2,
      height / 2 + 100,
      'Again?'
    );

    new Button(
      this,
      width / 2,
      height / 2 + 200,
      'Menu',
      'TitleScene'
    );

    this.scoreBox.setDepth(2);
  }

  setJewels() {
    this.jewels = this.physics.add.group();
    this.jewelsToRemove = [];

    this.jewelSound = this.sound.add(
      'jewelGathering',
      { volume: 1, loop: false }
    );
  }

  buildJewel(positionX, positionY) {
    const jewel = this.physics.add.sprite(
      positionX, positionY - 84, 'objects', this.sys.game.globals.jewelFrame
    );

    this.jewels.add(jewel);

    this.jewels.getLast(true).setVelocityX(
      this.sys.game.globals.gameSpeed * -1
    );

    this.jewels.getLast(true).setSize(40, 40);

    this.physics.add.overlap(
      this.player, this.jewels.getLast(true), this.collectJewel, null, this
    );
  }

  collectJewel(player, jewel) {
    this.jewelScoreText = this.add.text(
      jewel.x,
      jewel.y,
      '+' + this.sys.game.globals.jewelScore,
      {
        font: '14px monospace',
        fill: '#000000'
      }
    );

    const jewelTween = this.add.tween({
      targets: this.jewelScoreText,
      y: jewel.y - 50,
      duration: 1000,
      ease: 'Power1',
      onComplete: function () {
        this.jewelScoreText.destroy();
      },
      onCompleteScope: this
    });

    this.time.delayedCall(2000, function () {
      jewelTween.remove();
    }, null, this);

    this.jewelSound.play();
    this.playerScore += this.sys.game.globals.jewelScore;
    this.scoreText.setText('SCORE: ' + this.playerScore);
    jewel.destroy();
  }

  getJewelChance() {
    // 25% of chances to ge a jewel
    return Phaser.Math.Between(1, 100) <= this.sys.game.globals.jewelChance;
  }

  setUI() {
    const width = this.cameras.main.width;
    const boardContainer = this.add.container(width - 138, 42);
    const leftPart = this.add.image(-90, 0, 'ui', 249);
    const middlePartOne = this.add.image(-30, 0, 'ui', 250);
    const middlePartTwo = this.add.image(30, 0, 'ui', 250);
    const rightPart = this.add.image(90, 0, 'ui', 251);
    const assembly = [leftPart, middlePartOne, middlePartTwo, rightPart];

    this.scoreText = this.add.text(
      0, 0, 'SCORE: ' + this.playerScore,
      { font: '16px monospace', fill: '#000000' }
    );

    this.scoreText.setOrigin(0.5, 0.5);

    assembly.forEach(function (part) {
      part.scale = 4;
    });

    boardContainer.add(assembly);
    boardContainer.add(this.scoreText);
    this.scoreBox = boardContainer;
  }

  setPlatforms() {
    this.platforms = [];

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
    return Phaser.Math.Between(1, 100) <= this.sys.game.globals.obstacleChance;
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
        this.buildJewel(800 + midPoint, positionY);
      }

      if (this.getObstacleChance()) {
        this.buildObstacle(positionY, platform.getLength());
      }
    }

    platform.children.iterate(function (block) {
      block.setVelocityX(this.sys.game.globals.gameSpeed * -1);
      block.setImmovable(true);
    }, this);

    return platform;
  }

  update() {
    if (!this.gameIsOver) {
      if (this.player.y > this.game.config.height || this.player.x < 0) {
        this.gameOver(this.player);
      }

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
          this.player.setVelocityY(this.sys.game.globals.playerJumpForce * -1);
          this.player.jumpsCount -= 1;
          this.player.isJumping = true;
          this.jumpSound.play();
  
          this.time.delayedCall(500, function () {
            this.player.isJumping = false;
          }.bind(this));
        }
  
        this.player.setFrame(1);
        this.footstepSound.stop();
      } else if (this.player.body.touching.down) {
        this.player.jumpsCount = 2;

        if (!this.footstepSound.isPlaying) {
          this.footstepSound.play();
        }
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
    } else {
      if (this.player.anims.isPlaying) {
        this.player.anims.stop()
      }

      this.player.setFrame(6);
    }
  }
}
