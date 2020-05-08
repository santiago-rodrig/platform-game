import ScoresHelper from '../src/helpers/scoresHelper';

describe('fetchFirstTen', () => {
  const inputOne = {
    "result": [
      { "user": "bob", "score": 42 },
      { "user": "bob", "score": 31 },
      { "user": "jen", "score": 298 },
      { "user": "jen", "score": 122 },
      { "user": "lenny", "score": 12 }
    ]
  };

  test('it returns only the best scores for a given user', () => {
    expect(ScoresHelper.fetchFirstTen(inputOne)).toEqual([
        { "user": "jen", "score": 298 },
        { "user": "bob", "score": 42 },
        { "user": "lenny", "score": 12 }
    ]);
  });
});
