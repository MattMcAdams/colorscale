import Color from "color";
import type { easingOptionsType } from "./ease";
import { ease } from "./ease";
import * as hex from "./hex";
import chroma from "chroma-js";

export const getColorsList = (
  // The number of colors to produce steps for
  colorSteps: number,
  // How to mix the colors
  mixColor: "white" | "black",
  // Hue rotation -360 to 360
  hueRotation: number,
  // Hue easing
  hueEasing: easingOptionsType,
  // Saturation 0 to 100
  saturation: number,
  // Saturation easing
  satEasing: easingOptionsType,
  // Darkness / Lightness 0 to 100
  mixAmount: number,
  // Brightness easing
  brightEasing: easingOptionsType,
  // Root color
  mainColor: string,
  // Apply artificial smoothing
  // smoothing: boolean,
  // Error color
  errorColor: string,
) => {

  // Setup color array
  const colorsList: string[] = [];
  let steps = colorSteps;

  // if (smoothing) {
  //   steps = steps * 2
  // }

  // TEMP: Consider changing to chroma-js
  // const startColor = chroma(hex.fromNumber(mainColor));
  // let endColor = startColor;

  // if (mixColor === "white") {
  //   if (mixAmount !== 100) {
  //     endColor = endColor.mix('white', (mixAmount / 100));
  //   } else endColor= chroma('white');
  // } else if (mixColor === "black") {
  //   if (mixAmount !== 100) {
  //     endColor = endColor.mix('black', (mixAmount / 100));
  //   } else endColor= chroma('black');
  // }

  // if (saturation !== 0) {
  //   endColor = endColor.set("hsl.s", startColor.get("hsl.s") + saturation);
  // }

  // if (hueRotation !== 0) {
  //   endColor = endColor.set("hsl.h", startColor.get("hsl.h") + hueRotation);
  // }

  // return chroma.scale([startColor, endColor]).colors(colorSteps);

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

  // if (smoothing) {
  //   let i = colorsList.length;
  //   while (i--) i % 2 === 0 && (colorsList.splice(i, 1));
  // }

  return colorsList;
};
