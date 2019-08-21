/**
 * Returns random string which can be used for ids
 * @return {String}
 */
function randomId(chars) {
  chars = chars || 15;
  return (Math.random() + 1).toString(36).substring(2, chars);
}

/**
 * Returns random string which can be used for unique-ids.
 * @return {String}
 */
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
