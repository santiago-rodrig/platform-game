import { BootScene } from './scenes/bootScene';
import { PreloaderScene } from './scenes/preloaderScene';
import { TitleScene } from './scenes/titleScene';
import { OptionsScene } from './scenes/optionsScene';
import { CreditsScene } from './scenes/creditsScene';
import { GameScene } from './scenes/gameScene';

class Game extends Phaser.Game {
  constructor(config) {
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
      jewelScore: 50
    };

    this.scene.add('BootScene', BootScene);
    this.scene.add('PreloaderScene', PreloaderScene);
    this.scene.add('TitleScene', TitleScene);
    this.scene.add('OptionsScene', OptionsScene);
    this.scene.add('CreditsScene', CreditsScene);
    this.scene.add('GameScene', GameScene);
    this.scene.start('BootScene');
  }
}

window.addEventListener('load', function () {
  const config = {
    width: 800,
    height: 600,
    physics: { default: 'arcade' }
  };

  new Game(config);
});
