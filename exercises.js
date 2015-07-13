var parse = require('./app/parser/parse');
var run = require('./app/run');
var evaluate = require('./app/evaluate/evaluate');
var topEnv = require('./app/environment/topEnv');


console.log(parse("+(a, 10)"));

var prog = parse("if(true, false, true)");
console.log(evaluate(prog, topEnv)); // ? false


run("do(define(total, 0),",
  "   define(count, 1),",
  "   while(<(count, 11),",
  "         do(define(total, +(total, count)),",
  "            define(count, +(count, 1)))),",
  "   print(total))");
// ? 55



run("do(define(plusOne, fun(a, +(a, 1))),",
  "   print(plusOne(10)))");
// ? 11

run("do(define(pow, fun(base, exp,",
  "     if(==(exp, 0),",
  "        1,",
  "        *(base, pow(base, -(exp, 1)))))),",
  "   print(pow(2, 10)))");
// ? 1024

/*--------------------ARRAY-----------------------------------*/


run("do(define(sum, fun(array,",
  "     do(define(i, 0),",
  "        define(sum, 0),",
  "        while(<(i, length(array)),",
  "          do(define(sum, +(sum, element(array, i))),",
  "             define(i, +(i, 1)))),",
  "        sum))),",
  "   print(sum(array(1, 2, 3))))");
// ? 6

/*--------------------Closure------------------------------*/

run("do(define(f, fun(a, fun(b, +(a, b)))),",
  "   print(f(4)(5)))");
// ? 9


/*-------------------Comments-------------------------------*/

console.log(parse("# hello\nx"));
// ? {type: "word", name: "x"}

console.log(parse("a # one\n   # two\n()"));
// ? {type: "apply",
//    operator: {type: "word", name: "a"},
//    args: []}

/*--------------------set-----------------------------------*/

run("do(define(x, 4),",
  "   define(setx, fun(val, set(x, val))),",
  "   setx(50),",
  "   print(x))");
// ? 50
run("set(quux, true)");
// ? Ошибка вида ReferenceError