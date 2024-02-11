import Color from "color";
import type { easingOptionsType } from "./ease";
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
  hueEasing: easingOptionsType,
  // Saturation -100 to 100
  saturation: number,
  // Saturation easing
  satEasing: easingOptionsType,
  // Darkness / Lightness 0 to 100
  mixAmount: number,
  // Brightness easing
  brightEasing: easingOptionsType,
  // Root color
  mainColor: string,
  // Error color
  errorColor: string,
) => {
  // Setup color array
  const colorsList = [];

  // Confirm main color is valid
  const givenColor = hex.isValid(hex.toNumber(mainColor))
    ? hex.fromNumber(mainColor)
    : errorColor;

  // Initialize step variable
  let step;

  for (step = 0; step < colorSteps; step++) {
    if (hex.isValid(hex.fromNumber(mainColor))) {
      colorsList.push(
        Color(givenColor)
          .rotate(ease(hueEasing, step + 1, -hueRotation, colorSteps))
          .saturate(ease(satEasing, step + 1, saturation / 100, colorSteps))
          .mix(Color(mixColor), ease(brightEasing, step + 1, mixAmount / 100, colorSteps))
          .hex()
      );
    } else {
      colorsList.push(errorColor);
    }
  }

  return colorsList;
};
