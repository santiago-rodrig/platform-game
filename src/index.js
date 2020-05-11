import 'phaser';
import { BootScene } from './scenes/bootScene';
import { PreloaderScene } from './scenes/preloaderScene';
import { TitleScene } from './scenes/titleScene';
import { OptionsScene } from './scenes/optionsScene';
import { CreditsScene } from './scenes/creditsScene';
import { GameScene } from './scenes/gameScene';
import 'materialize-css/dist/js/materialize';
import 'materialize-css/dist/css/materialize.css';
import './scss/index.scss';
import './DOMManager';
import DOMManager from './DOMManager';

window.addEventListener('load', function () {
  DOMManager.renderBody();
  DOMManager.renderGame();
});
