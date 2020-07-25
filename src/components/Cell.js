import React, { useState, useEffect, useRef } from "react";

const Cell = (props) => {
    const {gridRef, pos, population, setPopulation, size} = props
    const checkState = (array, pos) => {
      return array.some((cell) => cell.x === pos.x && cell.y === pos.y);
    };
  
    const onClick = () => {
      setPopulation(
        checkState(population, pos)
          ? population.filter(
              (current_pos) => !(current_pos.y === pos.y && current_pos.x === pos.x)
            )
          : [...population, pos]
      );
    };
  
    const style = {
      backgroundColor: checkState(population, pos)
        ? "black"
        : "white",
      boxSizing: "border-box",
      height: `${(window.innerHeight-gridRef.current.offsetTop-10)/props.size}`,
      width: `${(window.innerHeight-gridRef.current.offsetTop-10)/props.size}`,
      border: "1px solid black",
      display: "inline-block",
      textAlign: "center",
    };
  
    return <div style={style} onClick={onClick}></div>;
  };

  export default Cell