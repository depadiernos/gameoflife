import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Cell from './Cell'

const App = () => {
  const [size, setSize] = useState(50);
  const [population, setPopulation] = useState([]);
  const [running, setRunning] = useState(false);
  const [generations, setGenerations] = useState(0);
  const [grid, setGrid] = useState();
  const gridRef = useRef()

  const style = {
    boxSizing: "border-box",
    height: "30px",
    margin: "5px",
    width: "200px",
    WebkitAppearance: "none",
    MozAppearance: "textfield",
  };

  useEffect(() => {
    let arr = new Array(size);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(size);
      for (let j = 0; j < size; j++) {
        arr[i][j] = 0;
      }
    }
    setGrid(arr);
  }, [size]);

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

  const newPopulation = (population) => {
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

  return (
    <div style={{height: "100%"}}>
      <div>
        <button
          style={style}
          onClick={() => {
            setRunning(!running);
          }}
        >
          {!running ? `Start` : `Stop`}
        </button>
        <button style={style}>Clear</button>
      </div>
      <div>
        <input
          style={style}
          type="number"
          value={size}
          onChange={(e) => {
            setSize(parseInt(e.target.value));
          }}
        />
        <select style={style} id="preset" name="presets">
          <option defaultValue="selected">Select a Preset</option>
          <option value="glider">Volvo</option>
          <option value="spaceship">Saab</option>
          <option value="cross">Fiat</option>
          <option value="blaster">Audi</option>
        </select>
      </div>
      <div  ref={gridRef} >
        {grid && grid.map((row, x) => {
            return (
              <div style={{width: "100%",}} key={x}>
                {row && 
                  row.map((_, y) => {
                    return (
                      <Cell
                        gridRef={gridRef}
                        size={size}
                        key={`${x}-${y}`}
                        pos={{ x, y }}
                        population={population}
                        setPopulation={setPopulation}
                      />
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
