import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Cell = (props) => {
  const style = {
    backgroundColor: props.live.includes(props.pos) ? "black" : "white",
    height: `${550 / props.size}px`,
    width: `${550 / props.size}px`,
    border: "1px solid black",
    display: "inline-block",
    textAlign: "center",
  };
  return (
    <div
      style={style}
      onClick={() => {
        props.setLive(
          props.live.includes(props.pos)
            ? props.live.filter((pos) => pos != props.pos)
            : [...props.live, props.pos]
        );
      }}
    ></div>
  );
};

const App = () => {
  const [size, setSize] = useState(50);
  const [live, setLive] = useState([]);
  const [running, setRunning] = useState(false);
  const [generations, setGenerations] = useState(0);
  const [grid, setGrid] = useState();

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
      {grid &&
        grid.map((row, x) => {
          return (
            <div key={x}>
              {row &&
                row.map((_, y) => {
                  return (
                    <Cell
                      size={size}
                      key={`${x}-${y}`}
                      pos={`${x},${y}`}
                      live={live}
                      setLive={setLive}
                    />
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
