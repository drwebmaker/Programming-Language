var topEnv = Object.create(null);

topEnv["true"] = true;
topEnv["false"] = false;

["+", "-", "*", "/", "==", "<", ">"].forEach(function(op){
  topEnv[op] = new Function('a,b', 'return a ' + op + 'b;');
});

topEnv["print"] = function(value) {
  console.log(value);
  return value;
};

topEnv["array"] = function(arr) {
  var array = [];
  for(var i = 0; i < arguments.length; i++) {
    array.push(arguments[i]);
  }
  return array;
};

topEnv["length"] = function(arr) {
  return arr.length;
};

topEnv["element"] = function(arr, index) {
  return arr[index];

};

module.exports = topEnv;