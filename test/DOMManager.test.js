import DOMManagerHelper from '../src/helpers/DOMManagerHelper';

describe('isPlayerNameValid', () => {
  const validNames = [
    'hello32',
    'srodrig96',
    'hejeroaz',
    'samuel12',
    'bob'
  ];

  const invalidNames = [
    // length must be between 3 and 9
    'hello32425',
    'hi',
    // name can not have special characters
    'hello**',
    'fred__.21'
  ];

  it('returns true for names with a length between 3 and 9', () => {
    validNames.forEach(name => {
      expect(DOMManagerHelper.isPlayerNameValid(name)).toBeTruthy();
    });
  });

  it('returns true for names with only letters and numbers', () => {
    validNames.forEach(name => {
      expect(DOMManagerHelper.isPlayerNameValid(name)).toBeTruthy();
    });
  });

  it('returns false for names with a length outside the renge 3 to 9', () => {
    invalidNames.forEach(name => {
      expect(DOMManagerHelper.isPlayerNameValid(name)).toBeFalsy();
    });
  });

  it('returns false for names with special characters', () => {
    invalidNames.forEach(name => {
      expect(DOMManagerHelper.isPlayerNameValid(name)).toBeFalsy();
    });
  });
});
