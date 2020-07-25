import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import nextGeneration from "../utils/nextGeneration";
import expandPopulation from "../utils/expandPopulation";
import checkState from "../utils/checkState";
import presets from "../utils/presets";
import Cell from "./Cell";

const App = () => {
  const [size, setSize] = useState(50);
  const [population, setPopulation] = useState([]);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [generations, setGenerations] = useState(0);
  const [grid, setGrid] = useState();
  const gridRef = useRef();

  const style = {
    boxSizing: "border-box",
    height: "30px",
    width: "150px",
    margin: "5px",
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

  const handlePreset = (e) => {
    setPopulation([...presets(e.target.value, size)]);
  };

  return (
    <div style={{ height: "100%" }}>
      <div>
        <button
          style={style}
          onClick={() => {
            setRunning(!running);
          }}
        >
          {!running ? `Start` : `Stop`}
        </button>
        <button
          style={style}
          onClick={() => {
            setPopulation([]);
          }}
        >
          Clear
        </button>
      </div>
      <div>
        <input
          style={{ ...style, width: "50px" }}
          type="number"
          value={size}
          onChange={(e) => {
            setSize(parseInt(e.target.value));
          }}
        />
        <input
          type="range"
          style={{ height: "9px", direction: "rtl" }}
          value={speed}
          min="0"
          max="300"
          onChange={(e) => setSpeed(parseInt(e.target.value))}
        />
      </div>
      <select
        style={style}
        id="preset"
        onChange={(e) => handlePreset(e)}
        name="presets"
      >
        <option value="selected" defaultValue="selected">
          Select a Preset
        </option>
        <option value="glider">Glider</option>
        <option value="spaceship">Spaceship</option>
        <option value="blinker">Blinker</option>
      </select>
      <section>
        <h2>Generation {generations}</h2>
        <div ref={gridRef}>
          {grid &&
            grid.map((row, x) => {
              return (
                <div style={{ width: "100%" }} key={x}>
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
      </section>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
