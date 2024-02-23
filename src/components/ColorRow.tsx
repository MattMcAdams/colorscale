import React from "react";
import Swatch from "./Swatch";
import config from "../types/config";
import { getColorsList } from "../functions/getColors";
import * as hex from "../functions/hex";

export const ColorRow = (props: { config: config }) => {
  const mainColor = hex.isValid(hex.fromNumber(props.config.keyColor)) ? props.config.keyColor : "#000000";

  const darkColors = getColorsList(
    props.config.dark.count,
    "black",
    props.config.dark.angle,
    props.config.dark.angleEase,
    props.config.dark.saturation,
    props.config.dark.saturationEase,
    props.config.dark.brightness,
    props.config.dark.brightnessEase,
    mainColor,
    "#FFFFFF"
  ).reverse();

  const lightColors = getColorsList(
    props.config.light.count,
    "white",
    props.config.light.angle,
    props.config.light.angleEase,
    props.config.light.saturation,
    props.config.light.saturationEase,
    props.config.light.brightness,
    props.config.light.brightnessEase,
    mainColor,
    "#FFFFFF"
  );

  return (
    <div id="ColorRow" className="flex overflow-x-auto">
      {darkColors.map((color: string, index: number) => (
        <Swatch key={index} hex={color} />
      ))}
      <Swatch hex={mainColor} primary={true} />
      {lightColors.map((color: string, index: number) => (
        <Swatch key={index} hex={color} />
      ))}
    </div>
  );
};

export default ColorRow;
