import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [size, setSize] = useState(30);
  const [live, setLive] = useState([]);
  const [running, setRunning] = useState(false);
  const [generations, setGenerations] = useState(0);
  const [grid, setGrid] = useState();

  const style = {
    height: `${500 / size}px`,
    width: `${500 / size}px`,
    border: "1px solid black",
    display: "inline-block",
    textAlign: "center",
  };

  useEffect(() => {
    let arr = new Array(size);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(size);
    }
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        arr[i][j] = 0;
      }
    }
    setGrid(arr);
  }, [size]);

  return (
    <div>
      <button
        onClick={() => {
          setRunning(!running);
        }}
      >
        {!running ? `Start` : `Stop`}
      </button>
      <button>Clear</button> <br />
      <br />
      <div>
        <input
          type="number"
          value={size}
          onChange={(e) => {
            setSize(parseInt(e.target.value));
          }}
        />
        <select id="preset" name="presets">
          <option selected="selected">Select a Preset</option>
          <option value="glider">Volvo</option>
          <option value="spaceship">Saab</option>
          <option value="cross">Fiat</option>
          <option value="blaster">Audi</option>
        </select>
      </div>
      <br />
      <br />
      {grid &&
        grid.map((row, x) => {
          return (
            <div key={x}>
              {row &&
                row.map((_, y) => {
                  return (
                    <span
                      style={style}
                      key={`${x}-${y}`}
                      id={`${x}-${y}`}
                    ></span>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
