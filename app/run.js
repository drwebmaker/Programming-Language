var parse = require('./parser/parse');
var evaluate = require('./evaluate/evaluate');
var topEnv = require('./environment/topEnv');


function run() {
  var env = Object.create(topEnv);
  var program = Array.prototype.slice.call(arguments, 0).join("\n");
  return evaluate(parse(program), env);
}

module.exports = run;