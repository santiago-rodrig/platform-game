import { Background } from '../objects/background';

export class LevelOneScene extends Phaser.Scene {
  constructor() {
    super('LevelOneScene');
  }

  create() {
    new Background(this);
  }
}