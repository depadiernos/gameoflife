import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import nextGeneration from "../utils/nextGeneration";
import expandPopulation from "../utils/expandPopulation";
import Cell from "./Cell";
import Controls from "./Controls"
import About from "./About";

const App = () => {
  const [size, setSize] = useState(50);
  const [population, setPopulation] = useState([]);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(20);
  const [generations, setGenerations] = useState(0);
  const [grid, setGrid] = useState();
  const [show, setShow] = useState(false);
  const gridRef = useRef();

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
        <Controls 
          setPopulation={setPopulation}
          setGenerations={setGenerations}
          setSize={setSize}
          setRunning={setRunning}
          running={running}
          size={size}
          setSize={setSize}
          speed={speed}
          setSpeed={setSpeed}
        />
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

export default App