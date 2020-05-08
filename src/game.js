import BootScene from './scenes/bootScene';
import PreloaderScene from './scenes/preloaderScene';
import TitleScene from './scenes/titleScene';
import OptionsScene from './scenes/optionsScene';
import CreditsScene from './scenes/creditsScene';
import LeaderBoardScene from './scenes/leaderBoardScene';
import GameScene from './scenes/gameScene';

export default class Game extends Phaser.Game {
  constructor(config, playerName) {
    super(config);

    this.globals = {
      music: true,
      musicPlaying: false,
      gameSpeed: 200,
      jewelChance: 25,
      obstacleChance: 30,
      playerGravity: 1000,
      playerJumpForce: 450,
      scoreRate: 10,
      jewelFrame: 36,
      jewelScore: 50,
      playerJumps: 2,
      blocksAmount: 2
    };

    this.playerName = playerName;

    this.scene.add('BootScene', BootScene);
    this.scene.add('PreloaderScene', PreloaderScene);
    this.scene.add('TitleScene', TitleScene);
    this.scene.add('OptionsScene', OptionsScene);
    this.scene.add('CreditsScene', CreditsScene);
    this.scene.add('LeaderBoardScene', LeaderBoardScene);
    this.scene.add('GameScene', GameScene);
    this.scene.start('BootScene');
  }
}