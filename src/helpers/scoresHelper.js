// it is a module
export default (() => {
  function fetchFirstTen(scoresObject) {
    // the input must be like the following
    // { "result": [ { "user": "username", "score": 43 }, ...] }
    const alreadyStored = [];

    const firstTen = scoresObject.result.sort((a, b) => {
      return b.score - a.score;
    }).filter(score => {
      if (!alreadyStored.find(element => element.user === score.user)) {
        alreadyStored.push(score);

        return true;
      }

      return false;
    }).slice(0, 10);

    return firstTen;
  }

  function fetchPlayerScore(playerName, scoresObject) {
    // the input must be the player name and an object
    // similar to the one required by the previous function
    const playerScore = scoresObject.result.filter(score => {
      return score.user === playerName;
    }).sort((a, b) => {
      return b.score - a.score;
    })[0];

    return playerScore;
  }

  function buildPostScoreParameters(playerName, playerScore) {
    // playerName: string
    // playerScore: number
    return {
      body: JSON.stringify(
        { "user": playerName, "score": playerScore }
      ),
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' }
    };
  }

  function shouldPostPlayerScore(scoreObject, freshScore) {
    // scoreObject: { user: string, score: number }
    // freshScore: number
    return !scoreObject || scoreObject.score < freshScore;
  }

  return {
    fetchFirstTen,
    fetchPlayerScore,
    buildPostScoreParameters,
    shouldPostPlayerScore
  };
})();
