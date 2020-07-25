import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import nextGeneration from "../utils/nextGeneration";
import expandPopulation from "../utils/expandPopulation";
import checkState from "../utils/checkState";
import presets from "../utils/presets";
import Cell from "./Cell";
import About from "./About";

const App = () => {
  const [size, setSize] = useState(50);
  const [population, setPopulation] = useState([]);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(5);
  const [generations, setGenerations] = useState(0);
  const [grid, setGrid] = useState();
  const [show, setShow] = useState(false);
  const gridRef = useRef();

  const style = {
    boxSizing: "border-box",
    height: "30px",
    width: "49%",
    margin: "2px",
    WebkitAppearance: "none",
    MozAppearance: "textfield",
  };

  const controlsStyle = {
    width: "400px",
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

  useEffect(() => {
    if (running) {
      const run = setTimeout(() => {
        const newPopulation = population.map((cell) =>
          expandPopulation(cell, size)
        );
        const newGeneration = nextGeneration(newPopulation.flat(), population);
        setPopulation(newGeneration);
      }, speed);
      return () => clearTimeout(run);
    }
  });

  const handlePreset = (e) => {
    setPopulation([...presets(e.target.value, size)]);
  };

  const handleStart = () => {
    setRunning(!running);
  };

  return (
    <div style={{ height: "100%" }}>
      <About show={show} setShow={setShow} />
      <header style={{ display: "flex" }}>
        <div
          onClick={() => setShow(!show)}
          style={{
            cursor: "pointer",
            border: "1px solid black",
            height: "100px",
            width: "100px",
            marginRight: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ textAlign: "center" }}>Conway's Game of Life</span>
        </div>
        <nav>
          <div style={controlsStyle}>
            <button style={style} onClick={handleStart}>
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
          <div style={{ ...controlsStyle }}>
            <label>
              Board Size
              <input
                style={{ ...style, width: "50px" }}
                type="number"
                value={size}
                onChange={(e) => {
                  setSize(parseInt(e.target.value));
                }}
              />
            </label>
            <label>
              Speed
              <input
                type="range"
                style={{ height: "9px", direction: "rtl" }}
                value={speed}
                min="5"
                max="500"
                onChange={(e) => setSpeed(parseInt(e.target.value))}
              />
            </label>
          </div>
          <select
            style={{ ...style, ...controlsStyle }}
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
        </nav>
      </header>

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
