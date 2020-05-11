import GameManager from './gameManager';
import DOMManagerHelper from './helpers/DOMManagerHelper';
import alertify from 'alertifyjs/build/alertify';
import 'alertifyjs/build/css/alertify.css';
import bodyHTML from './body.html';
import loaderGifSrc from './loader.gif';

export default class DOMManager {
  static renderLoader() {
    const loaderContainer = document.createElement('div');
    loaderContainer.id = 'loader-container';
    const loaderGif = new Image();
    loaderGif.src = loaderGifSrc;
    loaderContainer.appendChild(loaderGif);
    document.body.appendChild(loaderContainer);
  }

  static renderBody() {
    document.body.classList.add('grey', 'darken-3');
    document.body.innerHTML = bodyHTML;
  }

  static renderGame() {
    const gameElement = document.getElementById('platform-game');

    gameElement.appendChild(this.renderUserForm());
  }

  static renderUserForm() {
    const container = document.createElement('div');
    const formHeading = document.createElement('h4');
    const userForm = document.createElement('form');
    const userLabel = document.createElement('label');
    const userInput = document.createElement('input');
    const userSubmit = document.createElement('button');

    // set the form
    userForm.action = '#'; // we don't want to post, we are going to use fetch

    function alertUserAboutName() {
      alertify.alert(
        'Woops!',
        'Player name length must be 3 characters min and 9 characters max'
      );
    }

    userForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const playerName = userInput.value;
      const playerNameIsValid = DOMManagerHelper.isPlayerNameValid(playerName);

      if (playerNameIsValid) {
        const gameContainer = document.getElementById('platform-game');

        // clear the container for the game
        while (gameContainer.firstChild) {
          gameContainer.removeChild(gameContainer.firstChild);
        }

        gameContainer.style.padding = '0';
        GameManager.bootGame(playerName);
      } else {
        alertUserAboutName();
      }
    });

    // set label for attribute
    userLabel.htmlFor = 'player-name';
    userLabel.textContent = 'Player name';
    // set input id, name, and placeholder
    userInput.type = 'text';
    userInput.name = 'player-name';
    userInput.id = 'player-name';
    userInput.placeholder = 'bob33';
    // set submit button
    userSubmit.innerHTML = 'Submit <i class="material-icons right">send</i>';
    userSubmit.classList.add('btn', 'waves-effect', 'waves-light');
    // tuck everything inside the form
    userForm.append(userLabel, userInput, userSubmit);
    // set heading text
    formHeading.textContent = 'Provide a name for the player';
    // put all inside the container
    container.append(formHeading, userForm);

    return container;
  }
}
