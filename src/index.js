import { BootScene } from './scenes/bootScene';

class Game extends Phaser.Game {
  constructor(config) {
    super(config);
    this.scene.add('BootScene', BootScene);
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