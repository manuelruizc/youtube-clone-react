import React from "react";
// workaround for input checkbox fix this
const change = () => {
  return;
};
const ToggleButton = ({ color = false, active, onChange = change }) => {
  if (color) {
    const backgroundColor = active ? color : "#313131";
    const backgroundColorRound = active ? "white" : "#909090";
    return (
      <div
        className={`${active ? "switch switch--active" : "switch"}`}
        style={{ backgroundColor }}
      >
        <input
          className="checkbox-next"
          type="checkbox"
          checked={active}
          onChange={onChange}
        />
        <span
          className={`${active ? "round round--active" : "round"}`}
          style={{ backgroundColor: backgroundColorRound }}
        ></span>
      </div>
    );
  }
  return (
    <div className={`${active ? "switch switch--active" : "switch"}`}>
      <input className="checkbox-next" type="checkbox" checked={active} />
      <span className={`${active ? "round round--active" : "round"}`}></span>
    </div>
  );
};

export default ToggleButton;
