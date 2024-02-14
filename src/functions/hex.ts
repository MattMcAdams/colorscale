import Color from "color";

// Take hex string and add the # symbol
export const fromNumber = (number: string) => {
  if (number[0] !== "#") {
    number = "#" + number;
  }
  return number;
}

// Remove the # symbol from the hex string
export const toNumber = (hex: string) => {
  if (hex[0] === "#") {
    hex = hex.substring(1);
  }
  return hex;
}

// Validate hex color
export const isValid = (color: string) => {
  if (!color || typeof color !== "string") return false;

  color = toNumber(color);

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
