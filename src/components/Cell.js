import React, { useState, useEffect, useRef } from "react";
import checkState from "../utils/checkState";

const Cell = (props) => {
  const { gridRef, pos, population, setPopulation, size } = props;

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

  const style = {
    backgroundColor: `${checkState(population, pos) ? "black" : "white"}`,
    boxSizing: "border-box",
    height: `${(window.innerHeight - gridRef.current.offsetTop - 10) / size}`,
    width: `${(window.innerHeight - gridRef.current.offsetTop - 10) / size}`,
    border: "1px solid black",
    display: "inline-block",
    textAlign: "center",
  };

  return <div style={style} onClick={onClick}></div>;
};

export default Cell;
