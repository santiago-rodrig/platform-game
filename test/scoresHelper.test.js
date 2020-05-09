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

  const inputTwo = {
    "result": [
      { "user": "bob", "score": 42 },
      { "user": "sam", "score": 31 },
      { "user": "steve", "score": 298 },
      { "user": "jen", "score": 122 },
      { "user": "lenny", "score": 12 },
      { "user": "john", "score": 129 },
      { "user": "stuart", "score": 270 },
      { "user": "gabriel", "score": 2720 },
      { "user": "fabio", "score": 171 },
      { "user": "eduardo", "score": 64 },
      { "user": "miguel", "score": 3987 },
      { "user": "barbara", "score": 1654 },
      { "user": "patrick", "score": 5621 },
    ]
  };

  const inputThree = {
    "result": [
      { "user": "bob", "score": 42 },
      { "user": "sam", "score": 420 },
      { "user": "steve", "score": 142 },
      { "user": "jen", "score": 342 },
      { "user": "lenny", "score": 259 },
      { "user": "john", "score": 4210 },
      { "user": "stuart", "score": 2342 },
    ]
  };

  test('it returns only the best scores for a given user', () => {
    expect(ScoresHelper.fetchFirstTen(inputOne)).toEqual([
        { "user": "jen", "score": 298 },
        { "user": "bob", "score": 42 },
        { "user": "lenny", "score": 12 }
    ]);
  });

  test('it only fetches the best first ten scores', () => {
    expect(ScoresHelper.fetchFirstTen(inputTwo)).toEqual([
      { user: 'patrick', score: 5621 },
      { user: 'miguel', score: 3987 },
      { user: 'gabriel', score: 2720 },
      { user: 'barbara', score: 1654 },
      { user: 'steve', score: 298 },
      { user: 'stuart', score: 270 },
      { user: 'fabio', score: 171 },
      { user: 'john', score: 129 },
      { user: 'jen', score: 122 },
      { user: 'eduardo', score: 64 }
    ]);
  });

  test('it sorts the results in descending order', () => {
    expect(ScoresHelper.fetchFirstTen(inputThree)).toEqual([
      { user: 'john', score: 4210 },
      { user: 'stuart', score: 2342 },
      { user: 'sam', score: 420 },
      { user: 'jen', score: 342 },
      { user: 'lenny', score: 259 },
      { user: 'steve', score: 142 },
      { user: 'bob', score: 42 }
    ]);
  });
});
