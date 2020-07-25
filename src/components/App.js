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
  const [presetName, setPresetName] = useState("selected");
  const [running, setRunning] = useState(false);
  const [generations, setGenerations] = useState(0);
  const [grid, setGrid] = useState();
  const gridRef = useRef();

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

  const handlePreset = (e) => {
    setPopulation([...presets[e.target.value]]);
    setPresetName(e.target.value);
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
      </div>
      <div ref={gridRef}>
        {grid &&
          grid.map((row, x) => {
            return (
              <div style={{ width: "100%" }} key={x}>
                {row &&
                  row.map((_, y) => {
                    return (
                      <Cell
                        presetName={presetName}
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
