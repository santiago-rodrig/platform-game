import ScoresHelper from './helpers/scoresHelper';

const API = {
  scoresUrl: 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/cASPRoHtswEsGw9hjO5y/scores/',
};

export default class ScoresFetcher {
  static parseScores() {
    return fetch(API.scoresUrl).then(response => response.json());
  }

  static topScores() {
    return this.parseScores().then(data => ScoresHelper.fetchFirstTen(data));
  }

  static playerScore(playerName) {
    return this.parseScores().then(data => ScoresHelper.fetchPlayerScore(playerName, data));
  }

  static postPlayerScore(playerName, score) {
    function postScore() {
      fetch(
        API.scoresUrl,
        ScoresHelper.buildPostScoreParameters(playerName, score),
      );
    }

    return this.playerScore().then(playerScore => {
      if (ScoresHelper.shouldPostPlayerScore(playerScore, score)) postScore();
    });
  }
}
