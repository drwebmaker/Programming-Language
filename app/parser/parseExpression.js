var skipSpace = require('./skipSpace');
var parseApply = require('./parseApply');

function parseExpression(program) {
  program = skipSpace(program);
  var match, expr;
  if (match = /^"([^"]*)"/.exec(program)) {
    expr = {type: 'value', value: match[1]};
  } else if (match = /^\d+\b/.exec(program)) {
    expr = {type: 'value', value: Number(match[0])};
  } else if (match = /^[^\s(),"]+/.exec(program)) {
    expr = {type: 'word', name: match[0]};
  } else {
    throw new SyntaxError('Unexpected syntax: ' + program);
  }

  return parseApply(expr, program.slice(match[0].length));
}

module.exports = parseExpression;