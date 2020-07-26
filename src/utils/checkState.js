const checkState = (population, pos) => {
  return population.some((cell) => cell.x === pos.x && cell.y === pos.y);
};

export default checkState;
