function bubblesort(arr) {
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1; j++) {
      let [a, b] = [arr[j], arr[j + 1]];
      if (a > b) {
        swap(j, j + 1);
      }
    }
  }

  return arr;

  function swap(i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
}

var arr = bubblesort([66, 33, 22, 11, 777, 5000, 6, 3]);
