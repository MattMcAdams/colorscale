import React from "react";
import Swatch from "./Swatch";

export const ColorRow = (props: { darkColors: string[], mainColor: string, lightColors: string[] }) => {
  return (
    <div id="ColorRow" className="flex">
      {props.darkColors.map((color: string, index: number) => (
        <Swatch key={index} hex={color} />
      ))}
      <Swatch hex={props.mainColor} primary={true} />
      {props.lightColors.map((color: string, index: number) => (
        <Swatch key={index} hex={color} />
      ))}
    </div>
  );
};

export default ColorRow;
