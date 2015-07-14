function isString(obj) {
  return Object.prototype.toString.call(obj).toUpperCase() === '[OBJECT STRING]';
}
module.exports = isString;