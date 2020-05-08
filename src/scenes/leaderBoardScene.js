import { Button } from '../objects/button';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LeaderBoardScene');
  }

  create() {
    this.setBackground();
    this.setTitle();
    this.setMenuButton();
    this.setBoard();
  }

  setBoard() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const blockScale = 8;
    const blockSideLength = 16;
    const blockScaledSideLength = blockScale * blockSideLength;

    // top left corner
    this.buildBoardBlock(
      width / 2 - blockScaledSideLength * 1.5 + 6,
      height / 2 - blockScaledSideLength + 4,
      blockScale,
      246
    );
    // top center left
    this.buildBoardBlock(
      width / 2 - blockScaledSideLength * 0.5 + 2,
      height / 2 - blockScaledSideLength + 4,
      blockScale,
      247
    );
    // top center right
    this.buildBoardBlock(
      width / 2 + blockScaledSideLength * 0.5 - 2,
      height / 2 - blockScaledSideLength + 4,
      blockScale,
      247
    );
    // top right corner
    this.buildBoardBlock(
      width / 2 + blockScaledSideLength * 1.5 - 6,
      height / 2 - blockScaledSideLength + 4,
      blockScale,
      248
    );
    // left center
    this.buildBoardBlock(
      width / 2 - blockScaledSideLength * 1.5 + 6,
      height / 2,
      blockScale,
      276
    );
    // center left
    this.buildBoardBlock(
      width / 2 - blockScaledSideLength * 0.5 + 2,
      height / 2,
      blockScale,
      277
    );
    // center right
    this.buildBoardBlock(
      width / 2 + blockScaledSideLength * 0.5 - 2,
      height / 2,
      blockScale,
      277
    );
    // right center
    this.buildBoardBlock(
      width / 2 + blockScaledSideLength * 1.5 - 6,
      height / 2,
      blockScale,
      278
    );
    // bottom left corner
    this.buildBoardBlock(
      width / 2 - blockScaledSideLength * 1.5 + 6,
      height / 2 + blockScaledSideLength - 4,
      blockScale,
      306
    );
    // bottom center left
    this.buildBoardBlock(
      width / 2 - blockScaledSideLength * 0.5 + 2,
      height / 2 + blockScaledSideLength - 4,
      blockScale,
      307
    );
    // bottom center right
    this.buildBoardBlock(
      width / 2 + blockScaledSideLength * 0.5 - 2,
      height / 2 + blockScaledSideLength - 4,
      blockScale,
      307
    );
    // bottom right corner
    this.buildBoardBlock(
      width / 2 + blockScaledSideLength * 1.5 - 6,
      height / 2 + blockScaledSideLength - 4,
      blockScale,
      308
    );
  }

  buildBoardBlock(x, y, blockScale, frame) {
    const block = this.add.image(x, y, 'ui', frame);
    block.setScale(blockScale);
  }

  setBackground() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.add.image(width / 2, height / 2, 'background');
  }

  setTitle() {
    const width = this.cameras.main.width;

    const sceneTitle = this.add.text(width / 2, 50, 'LEADERBOARD', {
      font: '30px monospace',
      fill: '#000000'
    });

    sceneTitle.setOrigin(0.5, 0.5);
  }

  setMenuButton() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    new Button(this, width / 2, height - 50, 'Menu', 'TitleScene');
  }
}