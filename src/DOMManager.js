import GameManager from './gameManager';

export default class DOMManager {
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

    userForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const gameContainer = document.getElementById('platform-game');

      // clear the container for the game
      while (gameContainer.firstChild) {
        gameContainer.removeChild(gameContainer.firstChild);
      }

      gameContainer.style.padding = '0';
      const playerName = userInput.value;
      GameManager.bootGame(playerName);
    });

    // set label for attribute
    userLabel.htmlFor = 'username';
    userLabel.textContent = 'Username';
    // set input id, name, and placeholder
    userInput.type = 'text';
    userInput.name = 'username';
    userInput.id = 'username';
    userInput.placeholder = 'Platform Master 43';
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