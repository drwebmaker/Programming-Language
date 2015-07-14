var parseExpression = require('./parseExpression');
var skipSpace = require('./skipSpace');
var isString = require('../helpers/helpers');

function parse(program) {
  if(isString(program)) {
    var result = parseExpression(program);
    if (skipSpace(result.rest).length > 0) {
      throw new SyntaxError('Unexpected text after program');
    }
    return result.expr;
  } else {
    throw new SyntaxError('Unexpected value');
  }
}

module.exports = parse;