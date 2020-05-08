const API = {
  scoresUrl: 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/cASPRoHtswEsGw9hjO5y/scores/'
};

export default class ScoresFetcher {
  static parseScores() {
    return fetch(API.scoresUrl).then(response => response.json());
  }

  static topScores() {
    return this.parseScores().then(data => {
      const alreadyStored = [];

      const firstTen = data.result.sort((a, b) => {
        return b.score - a.score;
      }).filter(score => {
        if (!alreadyStored.find(element => element.user === score.user)) {
          alreadyStored.push(score);

          return true;
        } else {
          return false;
        }
      }).slice(0, 10);

      return firstTen;
    });
  }

  static playerScore(playerName) {
    return this.parseScores().then(data => {
      const playerScore = data.result.filter(score => {
        score.user === playerName;
      }).sort((a, b) => {
        return b.score - a.score;
      })[0];

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
            { "user": playerName, "score": score }
          ),
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' }
        }
      );

      console.log('SCORE POSTED!!!!');
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
