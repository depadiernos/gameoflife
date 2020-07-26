import React, { useState, useEffect } from "react";
import checkState from "../utils/checkState";
import minSize from "../utils/minSize"

const Cell = (props) => {
  const { pos, population, setPopulation, size, running } = props;

  const [gridSize, setGridSize] = useState(minSize());

  const style = {
    backgroundColor: `${checkState(population, pos) ? "black" : "white"}`,
    boxSizing: "border-box",
    height: `${(gridSize - 10) / size}`,
    width: `${(gridSize - 10) / size}`,
    border: "0.5px solid gray",
    display: "inline-block",
    margin: "0 auto",
  };

  const onClick = () => {
    setPopulation(
      checkState(population, pos)
        ? population.filter(
            (current_pos) =>
              !(current_pos.y === pos.y && current_pos.x === pos.x)
          )
        : [...population, pos]
    );
  };

  return <div style={style} onClick={!running ? onClick : null}></div>;
};

export default React.memo(Cell);
