/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';
/* eslint-enable import/no-unresolved */

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    this.scene.start('PreloaderScene');
  }
}
