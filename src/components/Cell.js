import React, { useState, useEffect } from "react";
import checkState from "../utils/checkState";

const Cell = (props) => {
  const { gridRef, pos, population, setPopulation, size, running } = props;

  const [gridSize, setGridSize] = useState();
  const minSize = () =>
    window.innerWidth < window.innerHeight
      ? setGridSize(window.innerWidth - 30)
      : setGridSize(window.innerHeight - gridRef.current.offsetTop)


  useEffect(()=>{
    window.addEventListener("resize", minSize)
    minSize()
  },[])

  const style = {
    backgroundColor: `${checkState(population, pos) ? "black" : "white"}`,
    boxSizing: "border-box",
    height: `${(gridSize - 10) / size}`,
    width: `${(gridSize - 10) / size}`,
    border: "0.5px solid gray",
    display: "inline-block",
    textAlign: "center",
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

export default Cell;
