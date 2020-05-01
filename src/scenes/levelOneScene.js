import { Background } from '../objects/background';
import { Platform } from '../objects/platform';

export class LevelOneScene extends Phaser.Scene {
  constructor() {
    super('LevelOneScene');
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    new Background(this);
  }
}