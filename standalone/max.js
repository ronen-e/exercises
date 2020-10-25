console.log(Math.max(2, 4)); // => 4
console.log(Math.max(2, 8)); // => 8

// we want a function that extends Math.pow
// Fix and implement generateMax to support the below code.

const generateMax = function generateMax(param1) {

};
// so that we could use it:
const max3 = generateMax(3);
console.log(max3(2)); // => 3

const max5 = generateMax(5);
console.log(max5(2)); // => 5

const max100 = generateMax(100);
console.log(max100(2, 200)); // => 200

// solution
const generate = function generateMax(param1) {
  return function max(...args) {
    return Math.max(param1, ...args);
  };
};

// better solution - with curry
function curry(fn) {
  var length = fn.length;
  var current = [];

  return function sauce(...args) {
    current = current.concat(args);

    if (current.length >= length) {
      return fn.apply(this, current);
    }

    return sauce;
  };
}

const max2 = curry(Math.max)(2);
console.log("max2(3)", max2(3,1)); // => 3
