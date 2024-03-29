import Color from "color";
import type { easingOptions } from "../types/easing";
import { ease } from "./ease";
import * as hex from "./hex";

export const getColorsList = (
  // The number of colors to produce steps for
  colorSteps: number,
  // How to mix the colors
  mixColor: "white" | "black",
  // Hue rotation -360 to 360
  hueRotation: number,
  // Hue easing
  hueEasing: easingOptions,
  // Saturation 0 to 100
  saturation: number,
  // Saturation easing
  satEasing: easingOptions,
  // Darkness / Lightness 0 to 100
  mixAmount: number,
  // Brightness easing
  brightEasing: easingOptions,
  // Root color
  mainColor: string,
  // Error color
  errorColor: string,
) => {

  // Setup color array
  const colorsList: string[] = [];
  let steps = colorSteps;

  // Confirm main color is valid
  const givenColor = hex.isValid(hex.toNumber(mainColor))
    ? hex.fromNumber(mainColor)
    : errorColor;

  // Initialize step variable
  let step;

  for (step = 0; step < steps; step++) {
    if (hex.isValid(hex.fromNumber(mainColor))) {
      colorsList.push(
        Color(givenColor)
          .rotate(ease(hueEasing, step + 1, -hueRotation, steps))
          .saturate(ease(satEasing, step + 1, saturation / 100, steps))
          .mix(Color(mixColor), ease(brightEasing, step + 1, mixAmount / 100, steps))
          .hex()
      );
    } else {
      colorsList.push(errorColor);
    }
  }

  return colorsList;
};

export default getColorsList;
