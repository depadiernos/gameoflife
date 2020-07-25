const expandPopulation = (cell) => {
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
    return perimeter.map(({ x, y }) => {
      return { x: cell.x + x, y: cell.y + y };
    });
  };

  export default expandPopulation