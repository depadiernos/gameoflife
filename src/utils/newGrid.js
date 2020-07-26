const newGrid = (size) => {
  let arr = [];
  if (size > 0) {
    for (let i = 0; i < size; i++) {
      arr.push(new Array(size));
      for (let j = 0; j < size; j++) {
        arr[i][j] = 0;
      }
    }
    return arr;
  }
};

export default newGrid;
