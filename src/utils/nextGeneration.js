const nextGeneration = (population, oldPopulation) => {
  const newPopulation = population.reduce((acc, object) => {
    const stringObj = JSON.stringify(object);
    if (typeof acc[stringObj] == "undefined") {
      acc[stringObj] = 1;
    } else {
      acc[stringObj] += 1;
    }
    return acc;
  }, {});
  const newGeneration = [];
  Object.keys(newPopulation).forEach((key) => {
    let isIncluded = false;
    for (let obj of oldPopulation) {
      if (JSON.stringify(obj) === key) {
        isIncluded = true;
      }
    }
    if (
      newPopulation[key] === 3 ||
      (newPopulation[key] === 4 && isIncluded === true)
    ) {
      newGeneration.push(JSON.parse(key));
    }
  });
  return newGeneration;
};

export default nextGeneration;
