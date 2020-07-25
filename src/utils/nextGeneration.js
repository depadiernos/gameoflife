const nextGeneration = (population) => {
    const newPopulation = population.reduce((acc, index) => {
      if (typeof acc[index] == "undefined") {
        acc[index] = 1;
      } else {
        acc[index] += 1;
      }
      return acc;
    }, {});
    return Object.keys(newPopulation).filter((key) => {
      return (
        newPopulation[key] === 3 ||
        (newPopulation[key] === 4 && population.include(key))
      );
    });
  };

  export default nextGeneration