// it is a module
export default (() => {
  function isPlayerNameValid(playerName) {
    const regex = /^[a-zA-Z\d]{3,9}$/;

    return regex.test(playerName)
  }

  return { isPlayerNameValid };
})();
