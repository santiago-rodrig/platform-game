export class LevelOneScene extends Phaser.Scene {
  constructor() {
    super('LevelOneScene');
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.add.image(width / 2, height / 2 - 212, 'background');
    this.add.image(width / 2 + 1024, height / 2 - 212, 'background');

    this.cursors = this.input.keyboard.createCursorKeys();
    this.platforms = this.physics.add.staticGroup();

    this.addPlatforms(32, height - 32, 1, 10);
    // 10 * 64 + 32 = 672
    this.addPlatforms(672, height - 32, 1, 20);

    this.anims.create({
      key: 'advance',
      frames: this.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
      frameRate: 8,
      repeat: -1
    });

    this.cameras.main.setBounds(0, 0, 800 * 2, 600);
    this.physics.world.setBounds(0, 0, 800 * 2, 600);
    this.player = this.physics.add.sprite(10, height - 300, 'player', 0);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
  }

  addPlatforms(x, y, rows, columns) {
    // x: starting horizontal point
    // y: starting vertical point
    // rows: number of block rows
    // column: number of block columns
    let platform;

    for (let i = 0, yOffset = y; i < rows; i += 1, yOffset -= 64) {
      for (let j = 0, xOffset = x; j < columns; j += 1, xOffset += 64) {
        platform = this.platforms.create(xOffset, yOffset, 'objects', 6);
      }
    }
  }

  update() {
    if (this.player.body.touching.down) {
      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-500);
        this.player.anims.stop();
        this.player.setFrame(1);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.flipX = false;

        if (!this.player.anims.isPlaying) {
          this.player.anims.play('advance');
        }
      } else if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.flipX = true;

        if (!this.player.anims.isPlaying) {
          this.player.anims.play('advance');
        }
      } else {
        this.player.setVelocityX(0);
        this.player.anims.stop();
        this.player.setFrame(0);
      }
    }
  }
}
