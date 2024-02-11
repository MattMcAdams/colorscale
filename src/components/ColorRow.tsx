import React from "react";
import Swatch from "./Swatch";
import { useSessionContext } from "../data/session";

export const ColorRow = (props: { darkColors: string[], lightColors: string[] }) => {
  const Session = useSessionContext();
  return (
    <div id="ColorRow" className="flex">
      {props.darkColors.map((color: string, index: number) => (
        <Swatch key={index} hex={color} />
      ))}
      <Swatch hex={Session.keyColor} primary={true} />
      {props.lightColors.map((color: string, index: number) => (
        <Swatch key={index} hex={color} />
      ))}
    </div>
  );
};

export default ColorRow;
