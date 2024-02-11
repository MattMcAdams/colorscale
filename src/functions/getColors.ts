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
  // Error color
  errorColor: string,
) => {
  // Setup color array
  const colorsList: string[] = [];

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
