const checkState = (array, pos) => {
    return array.some((cell) => cell.x === pos.x && cell.y === pos.y);
  };

export default checkState