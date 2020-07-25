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
    default:
      return [];
  }
};

export default presets;
