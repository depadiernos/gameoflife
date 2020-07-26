const presets = (value, size) => {
  const middle = ~~(size/2)
  switch (value) {
    case "glider":
      return [
        { x: middle, y: middle }, 
        { x: middle-1, y: middle },
        { x: middle-2, y: middle },
        { x: middle-2, y: middle-1 },
        { x: middle-1, y: middle-2 },
      ];
      break;
    case "spaceship":
      return [
        { x: middle-2, y: middle-3 }, 
        { x: middle-2, y: middle-2 },
        { x: middle-2, y: middle-1 },
        { x: middle-2, y: middle },
        { x: middle-2, y: middle+1 },
        { x: middle-2, y: middle+2 },
        { x: middle-1, y: middle+2 },
        { x: middle, y: middle+2 },
        { x: middle+1, y: middle+1 },
        { x: middle+2, y: middle-1 },
        { x: middle+2, y: middle-2 },
        { x: middle-1, y: middle-4 },
        { x: middle+1, y: middle-4 },
      ];
      break;
    case "blinker":
      return [
        { x: middle, y: middle-1 },
        { x: middle, y: middle },
        { x: middle, y: middle+1 },
      ];
      break;
    case "glidergun":
        return [
          {x: 7, y: 7},
          {x: 8, y: 7},
          {x: 8, y: 8},
          {x: 7, y: 8},
          {x: 7, y: 17},
          {x: 8, y: 17},
          {x: 6, y: 18},
          {x: 9, y: 17},
          {x: 10, y: 18},
          {x: 11, y: 19},
          {x: 11, y: 20},
          {x: 10, y: 22},
          {x: 9, y: 23},
          {x: 8, y: 23},
          {x: 8, y: 24},
          {x: 8, y: 21},
          {x: 7, y: 23},
          {x: 6, y: 22},
          {x: 5, y: 19},
          {x: 5, y: 20},
          {x: 7, y: 27},
          {x: 7, y: 28},
          {x: 6, y: 27},
          {x: 6, y: 28},
          {x: 5, y: 27},
          {x: 5, y: 28},
          {x: 4, y: 29},
          {x: 4, y: 31},
          {x: 3, y: 31},
          {x: 8, y: 29},
          {x: 8, y: 31},
          {x: 9, y: 31},
          {x: 5, y: 41},
          {x: 6, y: 41},
          {x: 6, y: 42},
          {x: 5, y: 42}
        ]
      break;
    default:
      return [];
  }
};

export default presets;
