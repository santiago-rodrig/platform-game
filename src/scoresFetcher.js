const API = {
  scoresUrl: 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/cASPRoHtswEsGw9hjO5y/scores/'
};

export default class ScoreFetcher {
  static parseScores() {
    return fetch(API.scoresUrl).then(response => response.json());
  }

  static topScores() {
    return this.parseScores().then(data => {
      const firstTen = data.result.sort((a, b) => {
        return b.score - a.score;
      }).slice(0, 10);

      return firstTen;
    });
  }

  static playerScore(playerName) {
    return this.parseScores().then(data => {
      const playerScore = data.result.find(score => {
        score.user === playerName;
      }).score;

      return playerScore;
    });
  }

  static postPlayerScore(playerName, score) {
    // it only posts the score to the API if it is not present or is lower
    function postScore() {
      fetch(
        API.scoresUrl,
        {
          body: JSON.stringify(
            { "user": playerName, "score": score.toString() }
          ),
          method: 'POST'
        }
      );
    }

    return this.playerScore().then(playerScore => {
      if (!playerScore) {
        postScore();

        return true;
      } else {
        if (score < playerScore) return;

        postScore();
      }
    });
  }
}