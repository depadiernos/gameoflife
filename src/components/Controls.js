import React, {useState} from "react";
import presets from "../utils/presets";


const Controls = (props) => {
  const {
    setPopulation,
    setGenerations,
    setRunning,
    running,
    size,
    setSize,
    speed,
    setSpeed
  } = props;

  const [preset, setPreset] = useState("selected");

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

  const handlePreset = (e) => {
    setPreset(e.target.value);
    setPopulation([...presets(e.target.value, size)]);
    setGenerations(0);
  };

  const handleStart = () => {
    setRunning(!running);
  };

  return (
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
        <option value="glidergun">Glider Gun</option>
      </select>
    </nav>
  );
};

export default Controls;
