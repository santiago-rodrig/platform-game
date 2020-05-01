import { BootScene } from './scenes/bootScene';
import { PreloaderScene } from './scenes/preloaderScene';
import { TitleScene } from './scenes/titleScene';

class Game extends Phaser.Game {
  constructor(config) {
    super(config);
    this.scene.add('BootScene', BootScene);
    this.scene.add('PreloaderScene', PreloaderScene);
    this.scene.add('TitleScene', TitleScene);
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