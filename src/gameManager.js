import Phaser from 'phaser';
import Game from './game';

export default class GameManager {
  static bootGame(playerName) {
    return new Game(
      {
        scale: {
          parent: 'platform-game',
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: 800,
          height: 600,
        },
        physics: { default: 'arcade' },
      },
      playerName,
    );
  }
}
