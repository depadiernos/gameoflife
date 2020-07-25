import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import nextGeneration from "../utils/nextGeneration";
import expandPopulation from "../utils/expandPopulation";
import presets from "../utils/presets";
import Cell from "./Cell";
import About from "./About";

const App = () => {
  const [size, setSize] = useState(50);
  const [population, setPopulation] = useState([]);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(20);
  const [preset, setPreset] = useState("selected");
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
    if (size > 0) {
      let arr = new Array(size);
      for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(size);
        for (let j = 0; j < size; j++) {
          arr[i][j] = 0;
        }
      }
      setGrid(arr);
    }
  }, [size]);

  useEffect(() => {
    if (running) {
      if (population.length < 1) {
        setRunning(false);
      }
      const run = setTimeout(() => {
        const newPopulation = population.map((cell) =>
          expandPopulation(cell, size)
        );
        const newGeneration = nextGeneration(newPopulation.flat(), population);
        setPopulation(newGeneration);
        setGenerations(generations + 1);
      }, speed);
      return () => clearTimeout(run);
    }
  });

  const handlePreset = (e) => {
    setPreset(e.target.value);
    setPopulation([...presets(e.target.value, size)]);
    setGenerations(0);
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
                setPreset("selected");
                setPopulation([]);
                setGenerations(0);
              }}
            >
              Clear
            </button>
          </div>
          <div style={{ ...controlsStyle }}>
            <label style={{ marginLeft: "5px" }}>
              Board Size
              <input
                style={{ ...style, width: "50px", marginLeft: "10px" }}
                type="number"
                value={JSON.stringify(size)}
                onChange={(e) => {
                  setSize(parseInt(e.target.value));
                }}
              />
            </label>
            <label style={{ marginLeft: "10px" }}>
              Speed
              <input
                type="range"
                style={{ height: "9px", direction: "rtl" }}
                value={speed}
                min="20"
                max="200"
                onChange={(e) => setSpeed(parseInt(e.target.value))}
              />
            </label>
          </div>
          <select
            style={{ ...style, ...controlsStyle }}
            id="preset"
            value={preset}
            onChange={(e) => handlePreset(e)}
            name="presets"
          >
            <option value="selected">Select a Preset</option>
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
                          running={running}
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
