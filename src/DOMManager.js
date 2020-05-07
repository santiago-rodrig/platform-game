import GameManager from './gameManager';

export default class DOMManager {
  static renderGame() {
    const gameElement = document.getElementById('platform-game');
  }

  static renderUserForm() {
    const userForm = document.createElement('form');
    const userLabel = document.createElement('label');
    const userInput = document.createElement('input');
    const userSubmit = document.createElement('input');

    // set the form
    userForm.action = '#'; // we don't want to post, we are going to use fetch

    userForm.addEventListener('submit', function (event) {
      event.preventDefault();

      fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/rhX7fiyhFxFHDELEOAWA/scores/')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const playerName = userInput.value;
        GameManager.bootGame(playerName);
      });
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
    userSubmit.type = 'submit';
    userSubmit.textContent = 'Submit';
  }
}