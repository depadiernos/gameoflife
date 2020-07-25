import React from "react";
import checkState from "../utils/checkState";

const Cell = (props) => {
  const { gridRef, pos, population, setPopulation, size, running } = props;

  const minSize = () => window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight

  const style = {
    backgroundColor: `${checkState(population, pos) ? "black" : "white"}`,
    boxSizing: "border-box",
    height: `${(minSize() - gridRef.current.offsetTop - 10) / size}`,
    width: `${(minSize() - gridRef.current.offsetTop - 10) / size}`,
    border: "1px solid black",
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


  return <div style={style} onClick={!running? onClick : null}></div>;
};

export default Cell;
