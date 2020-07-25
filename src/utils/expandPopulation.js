const expandPopulation = (cell, size) => {
    const perimeter = [
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
    ];
    const expandedPopulation = perimeter.map(({ x, y }) => {
      const newX = (cell.x + x + size) % size
      const newY = (cell.y + y + size) % size
      return { x: newX, y: newY };
    });
    return expandedPopulation
  };

  export default expandPopulation