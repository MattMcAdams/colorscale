import Color from 'color';

// Take hex string and add the # symbol
export const numberToHex = (number: string) => {
  if (number[0] !== "#") {
    number = "#" + number;
  }
  return number;
}

// Remove the # symbol from the hex string
export const hexToNumber = (hex: string) => {
  if (hex[0] === "#") {
    hex = hex.substring(1);
  }
  return hex;
}

// Set default for invalid color
export const errorColor = "transparent";

// Validate hex color
export const isValidHex = (color: string) => {
  if (!color || typeof color !== "string") return false;

  color = hexToNumber(color);

  switch (color.length) {
    case 3:
      return /^[0-9A-F]{3}$/i.test(color);
    case 6:
      return /^[0-9A-F]{6}$/i.test(color);
    case 8:
      return /^[0-9A-F]{8}$/i.test(color);
    default:
      return false;
  }
};

// https://github.com/hihayk/scale/blob/69b766bba2db046d3e8cb4026ae32a32c897f9ff/src/App.js#L212-L213
// https://github.com/hihayk/scale/blob/69b766bba2db046d3e8cb4026ae32a32c897f9ff/src/App.js#L212-L213
export const getColorsList = (
  // The number of colors to produce steps for
  colorSteps: number,
  // How to mix the colors
  mixColor: "white" | "black",
  // Hue rotation -360 to 360
  hueRotation: number,
  // Saturation -100 to 100
  saturation: number,
  // Darkness / Lightness 0 to 100
  mixAmount: number,
  // Root color
  mainColor: string
) => {
  // Setup color array
  const colorsList = [];

  // Confirm main color is valid
  const givenColor = isValidHex(numberToHex(mainColor))
    ? numberToHex(mainColor)
    : errorColor;

  // Initialize step variable
  let step;

  for (step = 0; step < colorSteps; step++) {
    if (isValidHex(numberToHex(mainColor))) {
      colorsList.push(
        Color(givenColor)
          .rotate(((step + 1) / colorSteps) * -hueRotation)
          .saturate(((step + 1) / colorSteps) * (saturation / 100))
          .mix(Color(mixColor), ((mixAmount / 100) * (step + 1)) / colorSteps)
          .hex()
      );
    } else {
      colorsList.push(errorColor);
    }
  }

  return colorsList;
};
