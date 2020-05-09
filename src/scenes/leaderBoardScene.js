import ScoresFetcher from '../scoresFetcher';
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
    this.setTopScores();
    this.setBestPlayerScore();
  }

  placeLoadingTextAnimation(x, y) {
    const loadingText = this.add.text(
      x,
      y,
      'Loading',
      {
        font: '16px monospace',
        fill: '#000000'
      }
    );

    loadingText.setOrigin(0.5, 0.5);

    const loadingTimer = this.time.addEvent({
      delay: 100,
      loop: true,
      callback: function () {
        if (loadingText.text.length < 10) {
          loadingText.text += '.';
        } else if (loadingText.text.length >= 10) {
          loadingText.setText('Loading');
        }
      },
      callbackScope: this,
      args: [loadingText]
    });

    return { loadingText, loadingTimer };
  }

  setTopScores() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const loadingObject = this.placeLoadingTextAnimation(
      width / 2 - 150,
      height / 2 - 100
    );

    ScoresFetcher.topScores().then(function (scores) {
      loadingObject.loadingTimer.remove();
      loadingObject.loadingText.destroy();
      this.writeTopScores(scores);
    }.bind(this));
  }

  setBestPlayerScore() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const loadingObject = this.placeLoadingTextAnimation(
      width / 2 + 150,
      height / 2 - 100
    );

    ScoresFetcher.playerScore(this.sys.game.playerName).then(
      function (playerScore) {
        loadingObject.loadingTimer.remove();
        loadingObject.loadingText.destroy();
        this.writePlayerScore(playerScore);
      }.bind(this)
    );
  }

  writePlayerScore(playerScore) {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const playerName = `(${this.sys.game.playerName})`;

    const spacePaddingLeft = ' '.repeat(
      Math.ceil((15 - playerName.length) / 2)
    );

    const spacePaddingRigt = ' '.repeat(
      Math.floor((15 - playerName.length) / 2)
    );

    const playerScoreTitle = this.add.text(
      width / 2 + 140,
      height / 2 - 128,
      "YOUR BEST SCORE\n" + spacePaddingLeft + playerName + spacePaddingRigt,
      { font: '16px monospace', fill: '#000000' }
    );

    playerScoreTitle.setOrigin(0.5, 0.5);

    function drawScoreText(text) {
      const playerScoreText = this.add.text(
        width / 2 + 140,
        height / 2 - 68,
        text,
        { font: '14px monospace', fill: '#000000' }
      );

      playerScoreText.setOrigin(0.5, 0.5);
    };

    if (!playerScore) {
      drawScoreText.call(this, 'NO SCORE SAVED');
    } else {
      drawScoreText.call(this, playerScore.score.toString());
    }
  }

  writeTopScores(scores) {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const scoresPositionX = width / 2 - 150;
    const scoresPositionY = height / 2 - 138;
    const scoresTextOffset = 25;
    const scoresFont = '14px monospace';
    const scoresColor = '#000000';

    const title = this.add.text(
      scoresPositionX,
      scoresPositionY,
      'TOP SCORES',
      { font: '16px monospace', fill: '#000000' }
    );

    title.setOrigin(0.5, 0.5);

    function padWithSpaces(scoreObject) {
      return ' '.repeat(
        19 - (scoreObject.user.length + scoreObject.score.toString().length)
      );
    }

    if (scores.length > 0) {
      const firstScoreText = this.add.text(
        scoresPositionX - 50,
        scoresPositionY + 30,
        `${scores[0].user}:${padWithSpaces(scores[0])}${scores[0].score}`,
        { font: scoresFont, fill: scoresColor }
      );

      scores.slice(1).forEach(function (score, index) {
        const scoreText = this.add.text(
          scoresPositionX - 50,
          scoresPositionY + 30 + (index + 1) * scoresTextOffset,
          `${score.user}:${padWithSpaces(score)}${score.score}`,
          { font: scoresFont, fill: scoresColor }
        );

      }, this);
    }
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
