import type { easingOptions } from "../types/easing";
import { config } from "../types/config";

export const defaultConfig: config = {
  keyColor: "0EA5E9",
  dark: {
    count: 4,
    brightness: 50,
    brightnessEase: "linear" as easingOptions,
    angle: -10,
    angleEase: "linear" as easingOptions,
    saturation: 15,
    saturationEase: "linear" as easingOptions,
  },
  light: {
    count: 5,
    brightness: 80,
    brightnessEase: "linear" as easingOptions,
    angle: 25,
    angleEase: "linear" as easingOptions,
    saturation: 0,
    saturationEase: "linear" as easingOptions,
  },
};

export const defaults= {
  library: {configs: [], groups: []},
  providerLoaded: false,
  configLoaded: false,
  libraryLoaded: false,
  advColorInfo: false,
  config: defaultConfig,
};

export const nullProvider = () => {
  console.error("Context Provider for the Session is not loaded")
};

export default defaults;
