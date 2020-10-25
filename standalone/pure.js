// What is a pure function?

let x = 8;
let y = 9;
let z = 11;

// is this pure? -> no - it has side effects
const updateVars = () => {
  y++;
  z = x * y;
};

// solution
const pureUpdateVars = (x, y) => {
  y++;
  return { z: x * y, y: y };
};

let res = pureUpdateVars(x, y);
y = res.y;
z = res.z;
