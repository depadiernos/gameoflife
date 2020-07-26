import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import nextGeneration from "../utils/nextGeneration";
import expandPopulation from "../utils/expandPopulation";
import newGrid from '../utils/newGrid'
import Cell from "./Cell";
import Controls from "./Controls"
import About from "./About";

const Board = () => {
  const [size, setSize] = useState(50);
  const [population, setPopulation] = useState([]);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [generations, setGenerations] = useState(0);
  const [grid, setGrid] = useState(newGrid(size));
  const [show, setShow] = useState(false);

  useEffect(() => {
      setGrid(newGrid(size));
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
        <div>
          {grid &&
            grid.map((row, x) => {
              return (
                <div style={{ width: "100%" }} key={x}>
                  {row &&
                    row.map((_, y) => {
                      return (
                        <Cell
                          running={running}
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

export default Board