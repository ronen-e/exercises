const data = [
  { name: "Avi", course: "Math", score: 80 },
  { name: "Dan", course: "Physics", score: 68 },
  { name: "Yoni", course: "Physics", score: 72 },
  { name: "Maria", course: "English", score: 86 },
  { name: "Lars", course: "Math", score: 90 },
  { name: "David", course: "English", score: 90 },
];

// Given the data above, calculate the average test score
// per course for all courses.
const avgscore = () => {
  var avg = new Map();

  data.forEach(item => avg.set(item.course, new Avg()));
  data.forEach(item => avg.get(item.course).add(item.score));
  avg.forEach((item, key) => avg.set(key, item.value));

  return Array.from(avg);
};

class Avg {
  constructor() {
    this.count = 0;
    this.sum = 0;
  }

  get value() {
    return this.count ? this.sum / this.count : 0;
  }

  add(value) {
    this.count++;
    this.sum += value;
  }
}

console.log("avgscore", avgscore());

// How would the implementation change if only
// Math avg score should be calculated?

// solution - add keys as parameters and filter by key
// also add the dataset as parameter
const avgscore2 = (items, keys = []) => {
  const avg = new Map();

  if (keys.length) {
    items = data.filter(item => {
      return keys.includes(item.course);
    });
  }

  items.forEach(item => avg.set(item.course, new Avg()));
  items.forEach(item => avg.get(item.course).add(item.score));
  avg.forEach((item, key) => avg.set(key, item.value));

  return Array.from(avg);
};
avgscore2(data, ["Math"]);
